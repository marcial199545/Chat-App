interface Ivalidation {
    isRealString(str: string): boolean;
}
class ValidationUtils implements Ivalidation {
    isRealString(str: string): boolean {
        console.log(typeof str === "string" && str.trim().length > 0);
        return typeof str === "string" && str.trim().length > 0;
    }
}

const validationUtils = new ValidationUtils();
export default validationUtils;
