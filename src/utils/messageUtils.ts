interface ImessageUtils {
    generateMessage(from: string, text: string): { from: string; text: string; createdAt: number };
    generateLocationMessage(from: string, latitude: number, longitude: number): { from: string; url: string; createdAt: number };
}
class MessageUtils implements ImessageUtils {
    generateMessage(from: string, text: string) {
        return { from, text, createdAt: new Date().getTime() };
    }
    generateLocationMessage(from: string, latitude: number, longitude: number) {
        return { from, url: `https://www.google.com/maps?q=${latitude},${longitude}`, createdAt: new Date().getTime() };
    }
}
const messageUtils = new MessageUtils();
export default messageUtils;
