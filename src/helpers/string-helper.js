export default class StringHelper {

    static compare(a, b) {

        a = a.toUpperCase();
        b = b.toUpperCase();

        return a.localeCompare(b);
    }

}
