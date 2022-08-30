export default function (nameWithExtention: string): string {
  return nameWithExtension.slice(nameWithExtension.indexOf('.') + 1, nameWithExtension.length)
}
