import StringHelper from "./string-helper";

export default class ArrayHelper {

    constructor(arr){
        this.arr = arr;
    }

    sortByStringProperty(property){
        return this.arr.sort((a, b) => StringHelper.compare(a[property], b[property]));
    }

}