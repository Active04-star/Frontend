/* eslint-disable @typescript-eslint/no-explicit-any */

export function zodValidate(data: unknown, schema: any) {
    const result = schema.safeParse(data);

    if (!result.success) {
        const errors = result.error.format();
        return { success: false, errors };
    }

    return { success: true, data: result.data };
}