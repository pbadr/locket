export default function (nameWithExtention: string): string {

    const lengthOfFileName: number = nameWithExtention.length;
    var extension: string = '';

    for (var index = 0; index < lengthOfFileName; index++) {
        if (nameWithExtention[index] == '.' && index + 1 >= lengthOfFileName - 4) {
            extension = nameWithExtention.slice(0, index);
        }
    }

    return extension;
}
