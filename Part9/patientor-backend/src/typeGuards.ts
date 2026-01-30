export const isName = (name: unknown): name is string => {
    return typeof name === "string";
}

export const isDateOfBirth = (dateOfBirth: unknown): dateOfBirth is string => {
    return typeof dateOfBirth === "string";
}

export const isGender = (gender: unknown): gender is string => {
    return typeof gender === "string";
}

export const isOccupation = (occupation: unknown): occupation is string => {
    return typeof occupation === "string";
}

export const isSsn = (ssn: unknown): ssn is string => {
    return typeof ssn === "string";
}