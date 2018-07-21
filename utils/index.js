export default function getNameValidationState(name) {
    const clearedName = name.replace(/[^\w]/g, '');

    if (clearedName.length > 0) return true;
    return false;
}