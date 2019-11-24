import StringHelper from "./string-helper";

export default class ArrayHelper {

    constructor(arr){
        this.arr = arr;
    }

    sortByStringProperty(proprety){
        return this.arr.sort((a, b) => StringHelper.compare(a[proprety], b[proprety]));
    }

}
