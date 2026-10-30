import AppKit
import PDFKit

guard CommandLine.arguments.count == 3 else { exit(2) }
let input = URL(fileURLWithPath: CommandLine.arguments[1])
let output = URL(fileURLWithPath: CommandLine.arguments[2], isDirectory: true)
try FileManager.default.createDirectory(at: output, withIntermediateDirectories: true)
guard let document = PDFDocument(url: input) else { exit(3) }

for index in 0..<document.pageCount {
  guard let page = document.page(at: index) else { continue }
  let bounds = page.bounds(for: .mediaBox)
  let scale: CGFloat = min(1.5, 1100 / max(bounds.width, bounds.height))
  let size = NSSize(width: bounds.width * scale, height: bounds.height * scale)
  let image = NSImage(size: size)
  image.lockFocus()
  NSColor.white.setFill()
  NSRect(origin: .zero, size: size).fill()
  guard let context = NSGraphicsContext.current?.cgContext else { exit(4) }
  context.scaleBy(x: scale, y: scale)
  page.draw(with: .mediaBox, to: context)
  image.unlockFocus()
  guard let tiff = image.tiffRepresentation,
        let bitmap = NSBitmapImageRep(data: tiff),
        let png = bitmap.representation(using: .png, properties: [:]) else { continue }
  try png.write(to: output.appendingPathComponent(String(format: "page-%02d.png", index + 1)))
}

print("Rendered \(document.pageCount) pages")
