import { AnyColumn,
    ColumnBaseConfig,
    ColumnDataType,
    ColumnsSelection, eq,
    GetColumnData,
    is,
    sql,
    SQL,
    Subquery,
    Table,
    View, ViewBaseConfig,
    WithSubquery } from 'drizzle-orm'
import { AnyPgSelect, PgColumn, PgTimestampString, SelectedFields, QueryBuilder } from 'drizzle-orm/pg-core'
import type { SelectResultFields } from 'drizzle-orm/query-builders/select.types'

export type TMediumInclude = { owner?: boolean, uploader?: boolean, tags?: boolean, favoredBy?: boolean }
export type TAlbumInclude = { owner?: boolean }
export type TOrderBy = PgColumn<ColumnBaseConfig<ColumnDataType, string>> | SQL<unknown>

export function coalesce<T> (value: SQL.Aliased<T> | SQL<T>, defaultValue: SQL) {
    return sql<T>`coalesce(${value}, ${defaultValue})`
}

export function jsonAgg<Column extends AnyColumn> (column: Column) {
    return coalesce<GetColumnData<Column, 'raw'>[]>(
        sql`json_agg(distinct ${sql`${column}`}) filter (where ${column} is not null)`,
        sql`'[]'`
    )
}

export function jsonBuildObject<T extends SelectedFields> (shape: T) {
    const chunks: SQL[] = []

    Object.entries(shape).forEach(([key, value]) => {
        if (chunks.length > 0) {
            chunks.push(sql.raw(','))
        }

        chunks.push(sql.raw(`'${key}',`))

        // json_build_object formats to ISO 8601 ...
        if (is(value, PgTimestampString)) {
            chunks.push(sql`timezone('UTC', ${value})`)
        } else {
            chunks.push(sql`${value}`)
        }
    })

    return sql<SelectResultFields<T>>`coalesce(json_build_object(${sql.join(
        chunks
    )}), '{}')`
}

export type InferColumns<T extends Table | View | Subquery | WithSubquery | AnyPgSelect> =
    T extends Table
    ? T['_']['columns']
    : T extends View | Subquery | WithSubquery | AnyPgSelect
    ? T['_']['selectedFields']
    : never

export function getColumns<
    T extends
    | Table
    | View
    | Subquery<string, ColumnsSelection>
    | WithSubquery<string, ColumnsSelection>
    | AnyPgSelect,
> (table: T): InferColumns<T> {
    return is(table, Table)
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (table as any)[(Table as any).Symbol.Columns]
        : is(table, View)
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (table as any)[ViewBaseConfig].selectedFields
            : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            table._.selectedFields
}

export function jsonAggBuildObject<
    T extends SelectedFields,
    Column extends AnyColumn
> (
    shape: T,
    options?: { orderBy?: { colName: Column, direction: 'ASC' | 'DESC' } }
) {
    return sql<SelectResultFields<T>[]>`coalesce(jsonb_agg(${jsonBuildObject(
        shape
    )}${options?.orderBy
        ? sql`order by ${options.orderBy.colName} ${sql.raw(
            options.orderBy.direction
        )}`
        : undefined
    }), '${sql`[]`}')`
}

export const getManyToMany = (as: string, thisTable: any, junctionTable: any, otherTable: any, junctionFields: string[], groupBy = thisTable.id) => {
    const qb = new QueryBuilder()

    return qb.select({
        id: thisTable.id,
        result: jsonAggBuildObject(getColumns(otherTable)).as(as)
    }).from(thisTable)
        .innerJoin(junctionTable, eq(thisTable.id, junctionTable[junctionFields[0]]))
        .innerJoin(otherTable, eq(otherTable.id, junctionTable[junctionFields[1]]))
        .groupBy(groupBy)
}
