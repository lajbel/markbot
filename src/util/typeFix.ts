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
