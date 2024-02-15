// @ts-nocheck Type this

import { types as kaboom2000Doc } from "../doc/2000.json" with { type: "json" };
import { types as kaboom3000Doc } from "../doc/3000.json" with { type: "json" };

type Doc = typeof kaboom2000Doc | typeof kaboom3000Doc;
type DocMember = Omit<Doc, "kaboom">;
type KaboomCtxMembers = Doc["KaboomCtx"][0]["members"]["add"];

// Type parsers
export function UnionTypes(types) {
    return types.map((t) => {
        return fixValue(t);
    }).join(" | ");
}

export function funcType(type) {
    return `() => ${fixValue(type.type)}`;
}

export function arrType(type) {
    return `${fixValue(type.elementType)}[]`;
}

export function litType(type) {
    return fixValue(type.literal);
}

export function fixValue(type): string | void {
    if (type.typeName) return "`" + type.typeName + "`";

    switch (type.kind) {
        case "NumberKeyword":
            return "`number`";
        case "StringKeyword":
            return "`string`";
        case "BooleanKeyword":
            return "`boolean`";
        case "AnyKeyword":
            return "`any`";
        case "NullKeyword":
            return "`null`";
        case "VoidKeyword":
            return "`void`";

        case "FunctionType":
            return funcType(type);
        case "ArrayKeyword":
            return "`[]`";
        case "ArrayType":
            return arrType(type);
        case "LiteralType":
            return litType(type);
    }
}

export function formatMember(type: KaboomCtxMembers) {
    if (type.typeName) return type.typeName;
}
