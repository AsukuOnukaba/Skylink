#import <Foundation/Foundation.h>
#import <CoreGraphics/CoreGraphics.h>
#import <ImageIO/ImageIO.h>
#import <UniformTypeIdentifiers/UniformTypeIdentifiers.h>

int main(int argc, const char *argv[]) {
  @autoreleasepool {
    if (argc != 4) return 2;
    NSString *input = [NSString stringWithUTF8String:argv[1]];
    size_t pageNumber = (size_t)strtoul(argv[2], NULL, 10);
    NSString *output = [NSString stringWithUTF8String:argv[3]];
    CGPDFDocumentRef document = CGPDFDocumentCreateWithURL((__bridge CFURLRef)[NSURL fileURLWithPath:input]);
    if (!document || pageNumber < 1 || pageNumber > CGPDFDocumentGetNumberOfPages(document)) return 3;
    CGPDFPageRef page = CGPDFDocumentGetPage(document, pageNumber);
    CGRect box = CGPDFPageGetBoxRect(page, kCGPDFMediaBox);
    CGFloat scale = 2.0;
    size_t width = (size_t)ceil(box.size.width * scale);
    size_t height = (size_t)ceil(box.size.height * scale);
    CGColorSpaceRef space = CGColorSpaceCreateDeviceRGB();
    CGContextRef context = CGBitmapContextCreate(NULL, width, height, 8, width * 4, space, kCGImageAlphaPremultipliedLast);
    CGContextSetRGBFillColor(context, 1, 1, 1, 1);
    CGContextFillRect(context, CGRectMake(0, 0, width, height));
    CGContextScaleCTM(context, scale, scale);
    CGContextDrawPDFPage(context, page);
    CGImageRef image = CGBitmapContextCreateImage(context);
    CGImageDestinationRef destination = CGImageDestinationCreateWithURL((__bridge CFURLRef)[NSURL fileURLWithPath:output], (__bridge CFStringRef)UTTypePNG.identifier, 1, NULL);
    CGImageDestinationAddImage(destination, image, NULL);
    bool ok = CGImageDestinationFinalize(destination);
    CFRelease(destination);
    CGImageRelease(image);
    CGContextRelease(context);
    CGColorSpaceRelease(space);
    CGPDFDocumentRelease(document);
    return ok ? 0 : 4;
  }
}
