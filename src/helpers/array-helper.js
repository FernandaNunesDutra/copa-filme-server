import StringHelper from "./string-helper";

export default class ArrayHelper {
  constructor(arr) {
    this.arr = arr;
  }

  sortByStringProperty(property) {
    return this.arr.sort((a, b) => {
      return StringHelper.compare(a[property], b[property]);
    });
  }

  remove(index) {
    this.arr.splice(index, 1);
  }

  removeLessValuePropertyBetween(firstIndex, secondIndex, property) {
    const removeIndex = this.arr[firstIndex][property] > this.arr[secondIndex][property] ?
                        secondIndex :
                        firstIndex;

    this.remove(removeIndex);
  }
}
