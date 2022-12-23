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

export function fixValue(t): string | void {
    if (t.typeName) return "`" + t.typeName + "`";
    switch (t.kind) {
        case "FunctionType":
            return funcType(t);
        case "ArrayKeyword":
            return "`[]`";
        case "ArrayType":
            return arrType(t);
        case "LiteralType":
            return litType(t);

        // keywords lol
        case "NumberKeyword":
            return "`number`";
        case "StringKeyword":
            return "`string`";
        case "BooleanKeyword":
            return "`boolean`";
        case "NullKeyword":
            return "`null`";
        case "VoidKeyword":
            return "`void`";
    }
}
