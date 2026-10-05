// ============================================
// script.js — makes the page interactive
// ============================================

// Keep the "Fun Stuff" grid as square as possible: with n boxes, use
// √n columns, rounded up (4 boxes → 2 columns, 5 to 9 boxes → 3 columns)
const buttonGrid = document.querySelector(".button-grid");
const cellCount = buttonGrid.children.length;
buttonGrid.style.setProperty("--columns", Math.ceil(Math.sqrt(cellCount)));

// The photos to choose from (all stored in the images/ folder). Each one has:
//   file:    the image file's name
//   alt:     a short description, shown as a caption and read by screen readers
//   by:      the photographer, who must be credited
//   source:  the photo's original page on Flickr
//   license: "CC BY 2.0" or "CC BY-SA 2.0" (free to use if the photographer
//            is credited), or "CC0" or "Public domain" (no restrictions)
// See images/CREDITS.md for the full list.
const images = [
  { file: "sailboat-1.jpg", alt: "Yachts and sailboats off St. Barts", by: "tiarescott", source: "https://www.flickr.com/photos/80403443@N00/33499530", license: "CC BY 2.0" },
  { file: "sailboat-2.jpg", alt: "A sailboat at sunset, Key West, Florida", by: "gabepopa", source: "https://www.flickr.com/photos/56534467@N04/14719177594", license: "CC BY 2.0" },
  { file: "sailboat-3.jpg", alt: "A sailboat on the water", by: "dejablu916", source: "https://www.flickr.com/photos/36494823@N03/3367861409", license: "CC BY 2.0" },
  { file: "beach-1.jpg", alt: "A tropical beach", by: "Lodewijk van den Broek", source: "https://www.flickr.com/photos/12760128@N04/2381369748", license: "CC BY 2.0" },
  { file: "beach-2.jpg", alt: "A tropical beach", by: "fishwasher", source: "https://www.flickr.com/photos/47717671@N05/31249131854", license: "CC BY 2.0" },
  { file: "beach-3.jpg", alt: "A panorama of a tropical beach", by: "victoria white2010", source: "https://www.flickr.com/photos/53355131@N07/4973140074", license: "CC BY 2.0" },
  { file: "mountain-1.jpg", alt: "A mountain landscape", by: "VincentD'Amico", source: "https://www.flickr.com/photos/58917221@N08/16189880796", license: "CC BY 2.0" },
  { file: "mountain-2.jpg", alt: "A mountain landscape", by: "Lenny K Photography", source: "https://www.flickr.com/photos/57527070@N06/24855790979", license: "CC BY 2.0" },
  { file: "mountain-3.jpg", alt: "Mount Everest", by: "Image Catalog", source: "https://www.flickr.com/photos/132795455@N08/18502982581", license: "CC0" },
  { file: "rome-1.jpg", alt: "The Colosseum, Rome", by: "kevinpoh", source: "https://www.flickr.com/photos/7679455@N03/6911860179", license: "CC BY 2.0" },
  { file: "rome-2.jpg", alt: "The Trevi Fountain, Rome", by: "Luca Serazzi", source: "https://www.flickr.com/photos/98616549@N07/12360687585", license: "CC BY 2.0" },
  { file: "rome-3.jpg", alt: "The Pantheon, Rome", by: "Philippe Vieux-Jeanton", source: "https://www.flickr.com/photos/11234074@N05/24823655706", license: "CC0" },
  { file: "nice-1.jpg", alt: "The Promenade des Anglais and beach, Nice", by: "jimmyharris", source: "https://www.flickr.com/photos/50216172@N00/2769217231", license: "CC BY 2.0" },
  { file: "nice-2.jpg", alt: "The French Riviera at Nice", by: "deepakhere.mypixels", source: "https://www.flickr.com/photos/7164796@N04/7892869322", license: "CC BY 2.0" },
  { file: "nice-3.jpg", alt: "The waterfall on Castle Hill (Colline du Château), above Nice", by: "Dale Harvey", source: "https://www.flickr.com/photos/69845378@N00/2268123348", license: "CC BY 2.0" },
  { file: "ireland-1.jpg", alt: "The Cliffs of Moher, Ireland", by: "DHuiz", source: "https://www.flickr.com/photos/65865070@N05/13609090133", license: "CC BY 2.0" },
  { file: "ireland-2.jpg", alt: "Glendalough, County Wicklow, Ireland", by: "Giuseppe Milo", source: "https://www.flickr.com/photos/87690240@N03/16454982694", license: "CC BY 2.0" },
  { file: "ireland-3.jpg", alt: "Malin Head, County Donegal, Ireland", by: "Giuseppe Milo", source: "https://www.flickr.com/photos/87690240@N03/52046139980", license: "CC BY 2.0" },
  { file: "fish-1.jpg", alt: "A clownfish", by: "Leszek.Leszczynski", source: "https://www.flickr.com/photos/47190679@N06/5068940056", license: "CC BY 2.0" },
  { file: "fish-2.jpg", alt: "A tropical fish", by: "wwarby", source: "https://www.flickr.com/photos/26782864@N00/1478901145", license: "CC BY 2.0" },
  { file: "fish-3.jpg", alt: "A white marlin leaping off North Carolina", by: "Dominic Sherony", source: "https://www.flickr.com/photos/9765210@N03/1394318584", license: "CC BY-SA 2.0" },
  { file: "fish-4.jpg", alt: "A striped bass", by: "Lake Mead National Recreation Area", source: "https://www.flickr.com/photos/30839029@N05/8982659422", license: "CC BY-SA 2.0" },
  { file: "fish-5.jpg", alt: "An angler with a mahi-mahi (dolphinfish) caught offshore", by: "Jed_Record", source: "https://www.flickr.com/photos/94224615@N00/2469952670", license: "CC BY 2.0" },
  { file: "fish-6.jpg", alt: "A common snook", by: "berniedup", source: "https://www.flickr.com/photos/65695019@N07/49594610507", license: "CC BY-SA 2.0" },
  { file: "fish-7.jpg", alt: "An angler with a red snapper", by: "Extra Zebra", source: "https://www.flickr.com/photos/23438569@N02/5827629435", license: "CC BY 2.0" },
  { file: "fish-8.jpg", alt: "A peacock flounder on the sea floor", by: "laszlo-photo", source: "https://www.flickr.com/photos/40467171@N00/153409631", license: "CC BY 2.0" },
  { file: "rome-4.jpg", alt: "Inside St. Peter's Basilica, Vatican City", by: "archer10 (Dennis)", source: "https://www.flickr.com/photos/22490717@N02/5390638891", license: "CC BY-SA 2.0" },
  { file: "rome-5.jpg", alt: "A horse-drawn carriage at the Spanish Steps, Rome", by: "M McBey", source: "https://www.flickr.com/photos/158652122@N02/48822157017", license: "CC BY 2.0" },
  { file: "rome-6.jpg", alt: "The Roman Forum", by: "Benson Kua", source: "https://www.flickr.com/photos/91545223@N00/5409380582", license: "CC BY-SA 2.0" },
  { file: "rome-7.jpg", alt: "Castel Sant'Angelo at night, Rome", by: "Giuseppe Milo", source: "https://www.flickr.com/photos/87690240@N03/16346546165", license: "CC BY 2.0" },
  { file: "rome-8.jpg", alt: "Piazza Navona, Rome", by: "Giuseppe Milo", source: "https://www.flickr.com/photos/87690240@N03/16052481656", license: "CC BY 2.0" },
  { file: "rome-9.jpg", alt: "The Altare della Patria, Rome", by: "Maciek Lulko", source: "https://www.flickr.com/photos/62401943@N06/12190246406", license: "CC BY 2.0" },
  { file: "rome-10.jpg", alt: "A restaurant terrace in Trastevere, Rome", by: "altotemi", source: "https://www.flickr.com/photos/66490057@N07/23438209872", license: "CC BY-SA 2.0" },
  { file: "rome-11.jpg", alt: "The Tiber River, Rome", by: "Gary Lee Todd", source: "https://www.flickr.com/photos/101561334@N08/48493971421", license: "Public domain" },
  { file: "eze-1.jpg", alt: "The hilltop village of Èze at night, near Nice", by: "gromgull", source: "https://www.flickr.com/photos/82775126@N00/3543268477", license: "CC BY 2.0" },
  { file: "eze-2.jpg", alt: "The view over the Mediterranean from the Château de la Chèvre d'Or, Èze", by: "miketnorton", source: "https://www.flickr.com/photos/49665685@N06/26601759614", license: "CC BY 2.0" },
  { file: "eze-3.jpg", alt: "Èze and the coast near Nice", by: "liquidphotos", source: "https://www.flickr.com/photos/57106549@N08/14200155540", license: "CC BY 2.0" },
  { file: "eze-4.jpg", alt: "The hills around Èze, France", by: "Dennis from Atlanta", source: "https://www.flickr.com/photos/89116575@N00/4606578582", license: "CC BY-SA 2.0" },
  { file: "tallship-1.jpg", alt: "The Mexican sail training ship Cuauhtémoc", by: "jl.cernadas", source: "https://www.flickr.com/photos/38035878@N07/7850489226", license: "CC BY 2.0" },
  { file: "tallship-2.jpg", alt: "The bow of the US Coast Guard tall ship Eagle", by: "archer10 (Dennis)", source: "https://www.flickr.com/photos/22490717@N02/36113849061", license: "CC BY-SA 2.0" },
  { file: "tallship-3.jpg", alt: "The four-masted barque Kruzenshtern", by: "Peer.Gynt", source: "https://www.flickr.com/photos/25554263@N04/7426633786", license: "CC BY-SA 2.0" },
  { file: "tallship-4.jpg", alt: "The Italian tall ship Amerigo Vespucci arriving in Dublin", by: "infomatique", source: "https://www.flickr.com/photos/80824546@N00/7846937046", license: "CC BY-SA 2.0" },
  { file: "americascup-1.jpg", alt: "Columbia and Shamrock II racing for the America's Cup, 1901", by: "F. A. Walter (Library of Congress)", source: "https://www.flickr.com/photos/39735679@N00/489373262", license: "Public domain" },
  { file: "americascup-2.jpg", alt: "The yacht Independence during the America's Cup, 1901", by: "F. A. Walter (Library of Congress)", source: "https://www.flickr.com/photos/39735679@N00/489373210", license: "Public domain" },
  { file: "americascup-3.jpg", alt: "Schooners racing during the America's Cup, 1901", by: "trialsanderrors", source: "https://www.flickr.com/photos/76204898@N00/2744719499", license: "CC BY 2.0" },
  { file: "americascup-4.jpg", alt: "Vigilant, the America's Cup defender of 1893", by: "K.Friend", source: "https://www.flickr.com/photos/25516039@N04/4212103289", license: "CC BY-SA 2.0" },
];

// Web addresses of the licenses, for the credit line's link
const licenseLinks = {
  "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
  "CC BY-SA 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
  "CC0": "https://creativecommons.org/publicdomain/zero/1.0/",
  "Public domain": "https://creativecommons.org/publicdomain/mark/1.0/",
};

// Find the elements on the page that we need to work with
const showButton = document.getElementById("show-image-button");
const dialog = document.getElementById("image-dialog");
const randomImage = document.getElementById("random-image");
const imageCaption = document.getElementById("image-caption");
const imageCredit = document.getElementById("image-credit");
const nextImageButton = document.getElementById("next-image-button");
const doneButton = document.getElementById("done-button");

let lastIndex = -1;

// Makes a link that opens in a new browser tab
function makeLink(text, url) {
  const link = document.createElement("a");
  link.textContent = text;
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener";
  return link;
}

// Picks a random photo and shows it, with its caption and credit, in the pop-up
function showRandomPhoto() {
  // Pick a random position in the list.
  // Repeat if it matches last time, so each click shows a different photo.
  let index;
  do {
    index = Math.floor(Math.random() * images.length);
  } while (index === lastIndex);
  lastIndex = index;

  const photo = images[index];
  randomImage.src = "images/" + photo.file;
  randomImage.alt = photo.alt;
  imageCaption.textContent = photo.alt;

  // Credit line, e.g. "Photo by tiarescott on Flickr, CC BY 2.0"
  imageCredit.replaceChildren(
    makeLink("Photo", photo.source),
    " by " + photo.by + " on Flickr, ",
    makeLink(photo.license, licenseLinks[photo.license])
  );
}

// When the main button is clicked: show a photo and open the pop-up
showButton.addEventListener("click", function () {
  showRandomPhoto();
  dialog.showModal();
});

// "Next": show another photo in the same pop-up
nextImageButton.addEventListener("click", showRandomPhoto);

// When "Done" is clicked: close the pop-up
doneButton.addEventListener("click", function () {
  dialog.close();
});


// ============================================
// Random fractal (a Julia set, computed pixel by pixel)
// ============================================

const fractalButton = document.getElementById("show-fractal-button");
const fractalDialog = document.getElementById("fractal-dialog");
const canvas = document.getElementById("fractal-canvas");
const fractalInfo = document.getElementById("fractal-info");
const fractalMoreButton = document.getElementById("fractal-more-button");
const fractalDoneButton = document.getElementById("fractal-done-button");

// "Depth" is the most times z = z² + c is repeated for each pixel before
// giving up and treating the point as "inside" the fractal. It starts low and
// doubles with each "More depth" click, up to the maximum (higher gets slow).
const juliaStartDepth = 4;
const maxDepth = 1024;

// The current fractal's settings, kept so "More depth" can redraw the same one
let juliaRe, juliaIm, juliaColors, juliaDepth;

// Points inside many Julia sets all get pulled toward one "fixed point" p,
// where p² + c = p. This returns p, plus how far z turns around p each step,
// or null if points aren't pulled toward it.
function attractingFixedPoint(cRe, cIm) {
  // p = (1 − √(1 − 4c)) / 2, using the square root of a complex number
  const aRe = 1 - 4 * cRe;
  const aIm = -4 * cIm;
  const size = Math.hypot(aRe, aIm);
  const rootRe = Math.sqrt(Math.max(0, (size + aRe) / 2));
  const rootIm = Math.sign(aIm) * Math.sqrt(Math.max(0, (size - aRe) / 2));
  const p = { x: (1 - rootRe) / 2, y: -rootIm / 2 };

  // Each step, the distance to p shrinks by a factor of 2|p| (so it must be
  // less than 1 for points to be pulled in) and turns by p's angle
  if (2 * Math.hypot(p.x, p.y) >= 1) {
    return null;
  }
  p.turn = Math.atan2(p.y, p.x);
  return p;
}

// Draws an "escape-time" fractal: for each pixel, repeat z = z² + c and see
// whether z escapes (grows very large).
//  - Julia set: c is fixed (juliaC) and z starts at the pixel's position.
//  - Mandelbrot set (juliaC is null): z starts at 0 and c is the pixel's position.
// view is the part of the complex plane to show: its center (x, y) and width.
// colorPhases holds three numbers (red, green, blue) that set the color scheme.
// maxIterations is the depth: the most times to repeat the formula per pixel.
// samplesPerSide > 1 smooths out grainy detail ("antialiasing"): each pixel is
// split into a samplesPerSide × samplesPerSide grid of points whose colors are
// averaged. 2 means 4 points per pixel, which takes 4 times as long.
function drawEscapeFractal(targetCanvas, view, colorPhases, maxIterations, juliaC, samplesPerSide = 1) {
  const context = targetCanvas.getContext("2d");
  const width = targetCanvas.width;
  const height = targetCanvas.height;
  const image = context.createImageData(width, height);
  const unitsPerPixel = view.width / width;

  // If the Julia set's inside points all get pulled toward one point,
  // the inside is colored by the angle they spiral into it from
  const target = juliaC ? attractingFixedPoint(juliaC.re, juliaC.im) : null;

  // Works out the color of one point on the complex plane and puts its
  // red, green and blue values into rgb
  function colorOfPoint(pointX, pointY, rgb) {
    let x, y, cRe, cIm;
    if (juliaC) {
      x = pointX; y = pointY; cRe = juliaC.re; cIm = juliaC.im;
    } else {
      x = 0; y = 0; cRe = pointX; cIm = pointY;
    }

    // Repeatedly apply z = z² + c and count the steps until z escapes
    let i = 0;
    let closest = Infinity;   // smallest (distance from 0)² seen so far
    let settledAngle = null;  // angle z approached the target point from

    // Speed-up: inside points end up repeating the same values in a loop.
    // Every so often, remember z; if z comes back to it, the point will never
    // escape, so stop early instead of running all maxIterations steps.
    let savedX = x, savedY = y;
    let stepsUntilSave = 8, stepsSinceSave = 0;

    while (x * x + y * y < 256 && i < maxIterations) {
      const xNew = x * x - y * y + cRe;
      y = 2 * x * y + cIm;
      x = xNew;
      i++;
      closest = Math.min(closest, x * x + y * y);

      if (Math.abs(x - savedX) < 1e-14 && Math.abs(y - savedY) < 1e-14) {
        i = maxIterations; // repeating forever: it's an inside point
        break;
      }
      stepsSinceSave++;
      if (stepsSinceSave === stepsUntilSave) {
        savedX = x;
        savedY = y;
        stepsSinceSave = 0;
        stepsUntilSave *= 2; // wait longer each time, to catch longer loops
      }

      if (target && settledAngle === null) {
        const dx = x - target.x;
        const dy = y - target.y;
        if (dx * dx + dy * dy < 1e-6) {
          // Undo the steady turning from each step so neighbors match up
          settledAngle = Math.atan2(dy, dx) - i * target.turn;
        }
      }
    }

    let t, brightness;
    if (i === maxIterations) {
      // Didn't escape: an "inside" point, drawn in a darker shade
      brightness = 0.7;
      if (settledAngle !== null) {
        t = settledAngle / (2 * Math.PI);
      } else {
        t = Math.sqrt(Math.sqrt(closest)) + 0.5;
      }
    } else {
      // Escaped: color by how quickly it escaped. The first log formula
      // smooths out the color bands; the second slows down color changes
      // near the fractal's edge so fine detail doesn't look speckled.
      brightness = 1;
      const smooth = i + 1 - Math.log2(Math.log(Math.sqrt(x * x + y * y)));
      t = Math.log(1 + Math.max(smooth, 0)) * 0.3;
    }

    for (let k = 0; k < 3; k++) {
      rgb[k] = brightness * 255 * (0.5 + 0.5 * Math.cos(2 * Math.PI * (t + colorPhases[k])));
    }
  }

  const rgb = [0, 0, 0];
  const samplesPerPixel = samplesPerSide * samplesPerSide;

  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      // Add up the colors of the sample points spread evenly across this pixel
      let red = 0, green = 0, blue = 0;
      for (let sy = 0; sy < samplesPerSide; sy++) {
        for (let sx = 0; sx < samplesPerSide; sx++) {
          // Offset of this sample from the pixel's position (0 when there's just one)
          const offsetX = (sx + 0.5) / samplesPerSide - 0.5;
          const offsetY = (sy + 0.5) / samplesPerSide - 0.5;
          // Canvas rows count downward, but imaginary values go up,
          // so moving down a row means subtracting
          colorOfPoint(
            view.x + (px + offsetX - width / 2) * unitsPerPixel,
            view.y - (py + offsetY - height / 2) * unitsPerPixel,
            rgb
          );
          red += rgb[0];
          green += rgb[1];
          blue += rgb[2];
        }
      }

      // Each pixel takes 4 slots in the image data: red, green, blue, alpha
      const offset = (py * width + px) * 4;
      image.data[offset] = red / samplesPerPixel;
      image.data[offset + 1] = green / samplesPerPixel;
      image.data[offset + 2] = blue / samplesPerPixel;
      image.data[offset + 3] = 255; // fully opaque
    }
  }

  context.putImageData(image, 0, 0);
}

fractalButton.addEventListener("click", function () {
  // Pick a random c near the edge of the Mandelbrot set's main "heart" shape.
  // That's where Julia sets are most detailed and interesting. Angles near 0
  // are skipped: that's the heart's sharp point, where results look flat.
  const angle = 0.4 + Math.random() * (2 * Math.PI - 0.8);
  const radius = 0.95 + Math.random() * 0.08;
  const lambdaRe = radius * Math.cos(angle);
  const lambdaIm = radius * Math.sin(angle);
  // c = λ/2 − λ²/4
  const cRe = lambdaRe / 2 - (lambdaRe * lambdaRe - lambdaIm * lambdaIm) / 4;
  const cIm = lambdaIm / 2 - (2 * lambdaRe * lambdaIm) / 4;

  // Remember this fractal's settings, with a random color scheme,
  // and start at the lowest depth
  juliaRe = cRe;
  juliaIm = cIm;
  juliaColors = [Math.random(), Math.random(), Math.random()];
  juliaDepth = juliaStartDepth;

  showJuliaDepth();
  fractalDialog.showModal();
});

// Draws the current fractal at the current depth and updates the caption
function showJuliaDepth() {
  const view = { x: 0, y: 0, width: 3.2 }; // shows -1.6 to 1.6 horizontally
  drawEscapeFractal(canvas, view, juliaColors, juliaDepth, { re: juliaRe, im: juliaIm });

  const sign = juliaIm < 0 ? "−" : "+";
  fractalInfo.textContent =
    "Julia set with c = " + juliaRe.toFixed(3) + " " + sign + " " + Math.abs(juliaIm).toFixed(3) +
    "i, depth " + juliaDepth;
  fractalMoreButton.disabled = juliaDepth >= maxDepth;
}

// Same fractal, twice the depth
fractalMoreButton.addEventListener("click", function () {
  juliaDepth = Math.min(juliaDepth * 2, maxDepth);
  showJuliaDepth();
});

fractalDoneButton.addEventListener("click", function () {
  fractalDialog.close();
});


// ============================================
// Mandelbrot zoom (a random close-up of the Mandelbrot set's edge)
// ============================================

const mandelbrotButton = document.getElementById("show-mandelbrot-button");
const mandelbrotDialog = document.getElementById("mandelbrot-dialog");
const mandelbrotCanvas = document.getElementById("mandelbrot-canvas");
const mandelbrotInfo = document.getElementById("mandelbrot-info");
const mandelbrotMoreButton = document.getElementById("mandelbrot-more-button");
const mandelbrotDoneButton = document.getElementById("mandelbrot-done-button");
const mandelbrotBackButton = document.getElementById("mandelbrot-back-button");

// Zoomed-in views need more depth before anything shows, so start higher.
// Deep dives need even more, so this one can go deeper than the Julia set.
const mandelbrotStartDepth = 32;
const mandelbrotMaxDepth = 4096;

// Past this view width, the computer's numbers aren't precise enough
// to tell neighboring pixels apart, so zooming in further stops working
const smallestViewWidth = 1e-12;

// The current zoom's settings, kept so "More depth" can redraw the same one
let mandelbrotView, mandelbrotColors, mandelbrotDepth;

let mandelbrotImage = null;   // the finished picture, to redraw under the selection box
let mandelbrotHistory = [];   // earlier views, for the Back button
let mandelbrotSharp = false;  // whether the current picture has been sharpened

// Sharp screens pack more than one real pixel into each CSS pixel. The canvas
// gets that many more pixels (up to 2× each way) so the picture isn't blurry.
let mandelbrotScale = 1;

const mandelbrotSharpenButton = document.getElementById("mandelbrot-sharpen-button");

// Picks random points until it finds one right at the edge of the
// Mandelbrot set, where all the interesting detail is
function findMandelbrotEdgePoint() {
  while (true) {
    const cRe = -2 + Math.random() * 2.5;
    const cIm = -1.2 + Math.random() * 2.4;

    let x = 0;
    let y = 0;
    let i = 0;
    while (x * x + y * y < 4 && i < maxDepth) {
      const xNew = x * x - y * y + cRe;
      y = 2 * x * y + cIm;
      x = xNew;
      i++;
    }

    // Escaping, but only after many steps, means it's right next to the set
    if (i >= 50 && i < maxDepth) {
      return { x: cRe, y: cIm };
    }
  }
}

mandelbrotButton.addEventListener("click", function () {
  // Match the canvas to the screen's real pixels
  mandelbrotScale = Math.min(window.devicePixelRatio || 1, 2);
  mandelbrotCanvas.width = Math.round(640 * mandelbrotScale);
  mandelbrotCanvas.height = Math.round(480 * mandelbrotScale);

  const center = findMandelbrotEdgePoint();
  // Random zoom: the view is between 0.003 and 0.3 units wide
  // (the whole Mandelbrot set is about 3 units wide)
  const viewWidth = Math.pow(10, -2.5 + Math.random() * 2);

  mandelbrotView = { x: center.x, y: center.y, width: viewWidth };
  mandelbrotColors = [Math.random(), Math.random(), Math.random()];
  mandelbrotDepth = mandelbrotStartDepth;
  mandelbrotHistory = [];
  mandelbrotSharp = false;

  showMandelbrotDepth();
  mandelbrotDialog.showModal();
});

// Draws the current zoom at the current depth and updates the caption.
// Deep or sharpened views can take several seconds, so first show
// "Computing…" and disable the buttons, then draw once the browser
// has had a moment to display that.
let mandelbrotBusy = false; // true while a picture is being computed

function showMandelbrotDepth() {
  mandelbrotBusy = true;
  mandelbrotInfo.textContent = "Computing…";
  mandelbrotMoreButton.disabled = true;
  mandelbrotBackButton.disabled = true;
  mandelbrotSharpenButton.disabled = true;
  requestAnimationFrame(function () {
    setTimeout(drawMandelbrotNow, 0);
  });
}

function drawMandelbrotNow() {
  const samplesPerSide = mandelbrotSharp ? 2 : 1; // sharpened = 4 points per pixel
  drawEscapeFractal(mandelbrotCanvas, mandelbrotView, mandelbrotColors, mandelbrotDepth, null, samplesPerSide);

  // Save the finished picture so the selection box can be drawn over it
  const context = mandelbrotCanvas.getContext("2d");
  mandelbrotImage = context.getImageData(0, 0, mandelbrotCanvas.width, mandelbrotCanvas.height);

  // The deeper the zoom, the more decimal places it takes to say where we are
  const v = mandelbrotView;
  const digits = Math.min(15, Math.max(5, Math.ceil(-Math.log10(v.width)) + 3));
  const sign = v.y < 0 ? "−" : "+";
  mandelbrotInfo.textContent =
    "Near " + v.x.toFixed(digits) + " " + sign + " " + Math.abs(v.y).toFixed(digits) +
    "i, zoomed " + Math.round(3 / v.width).toLocaleString() + "×, depth " + mandelbrotDepth +
    (mandelbrotSharp ? ", sharpened" : "");

  mandelbrotMoreButton.disabled = mandelbrotDepth >= mandelbrotMaxDepth;
  mandelbrotBackButton.disabled = mandelbrotHistory.length === 0;
  mandelbrotSharpenButton.disabled = mandelbrotSharp;
  mandelbrotBusy = false;
}

// Same zoom, twice the depth. (Like zooming, this goes back to the faster,
// unsharpened drawing; press Sharpen again when you like what you see.)
mandelbrotMoreButton.addEventListener("click", function () {
  mandelbrotDepth = Math.min(mandelbrotDepth * 2, mandelbrotMaxDepth);
  mandelbrotSharp = false;
  showMandelbrotDepth();
});

// Go back to the view before the last zoom
mandelbrotBackButton.addEventListener("click", function () {
  mandelbrotView = mandelbrotHistory.pop();
  mandelbrotSharp = false;
  showMandelbrotDepth();
});

// Redraw the same view with 4 points per pixel, smoothing out grainy detail
mandelbrotSharpenButton.addEventListener("click", function () {
  mandelbrotSharp = true;
  showMandelbrotDepth();
});

// --- Zooming by dragging a box or clicking on the picture ---

let dragStart = null; // where the mouse (or finger) went down, in canvas pixels

// Converts a mouse position to canvas pixels. (The canvas may be shown
// smaller than its real size on small screens, so this scales it.)
function canvasPoint(event) {
  const rect = mandelbrotCanvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * mandelbrotCanvas.width / rect.width,
    y: (event.clientY - rect.top) * mandelbrotCanvas.height / rect.height,
  };
}

// The selection box from start to end, kept the same shape as the canvas
// so the zoomed-in picture isn't stretched
function selectionBox(start, end) {
  const aspect = mandelbrotCanvas.height / mandelbrotCanvas.width;
  const width = Math.max(Math.abs(end.x - start.x), Math.abs(end.y - start.y) / aspect);
  const height = width * aspect;
  return {
    x: end.x < start.x ? start.x - width : start.x,
    y: end.y < start.y ? start.y - height : start.y,
    width: width,
    height: height,
  };
}

// Recomputes the picture so that the canvas pixel "center" becomes the new
// middle of the view and "widthInPixels" pixels of the old view fill the canvas
function zoomInto(center, widthInPixels) {
  const v = mandelbrotView;
  const unitsPerPixel = v.width / mandelbrotCanvas.width;
  const newWidth = widthInPixels * unitsPerPixel;

  if (newWidth < smallestViewWidth) {
    mandelbrotCanvas.getContext("2d").putImageData(mandelbrotImage, 0, 0);
    const note = " (can't zoom further: the computer's numbers run out of precision)";
    if (!mandelbrotInfo.textContent.endsWith(note)) {
      mandelbrotInfo.textContent += note; // add it once, not again on every click
    }
    return;
  }

  mandelbrotHistory.push(v);
  mandelbrotSharp = false;
  mandelbrotView = {
    x: v.x + (center.x - mandelbrotCanvas.width / 2) * unitsPerPixel,
    y: v.y - (center.y - mandelbrotCanvas.height / 2) * unitsPerPixel, // rows count downward
    width: newWidth,
  };
  showMandelbrotDepth();
}

mandelbrotCanvas.addEventListener("pointerdown", function (event) {
  if (mandelbrotBusy) {
    return; // ignore clicks until the current picture is finished
  }
  dragStart = canvasPoint(event);
  mandelbrotCanvas.setPointerCapture(event.pointerId); // keep tracking outside the canvas
});

mandelbrotCanvas.addEventListener("pointermove", function (event) {
  if (dragStart === null) {
    return;
  }
  // Redraw the saved picture, then the box on top of it
  const box = selectionBox(dragStart, canvasPoint(event));
  const context = mandelbrotCanvas.getContext("2d");
  context.putImageData(mandelbrotImage, 0, 0);
  context.strokeStyle = "white";
  context.lineWidth = 2 * mandelbrotScale;
  context.strokeRect(box.x, box.y, box.width, box.height);
});

mandelbrotCanvas.addEventListener("pointerup", function (event) {
  if (dragStart === null) {
    return;
  }
  const end = canvasPoint(event);
  const box = selectionBox(dragStart, end);
  dragStart = null;

  if (box.width < 5 * mandelbrotScale) {
    // Barely moved: treat it as a click and zoom in 4× around that spot
    zoomInto(end, mandelbrotCanvas.width / 4);
  } else {
    // Zoom so the box fills the canvas
    zoomInto({ x: box.x + box.width / 2, y: box.y + box.height / 2 }, box.width);
  }
});

mandelbrotCanvas.addEventListener("pointercancel", function () {
  dragStart = null;
  mandelbrotCanvas.getContext("2d").putImageData(mandelbrotImage, 0, 0);
});

mandelbrotDoneButton.addEventListener("click", function () {
  mandelbrotDialog.close();
});


// ============================================
// Sierpiński triangle (one more division each time "Next step" is clicked)
// ============================================

const sierpinskiButton = document.getElementById("show-sierpinski-button");
const sierpinskiDialog = document.getElementById("sierpinski-dialog");
const sierpinskiCanvas = document.getElementById("sierpinski-canvas");
const sierpinskiInfo = document.getElementById("sierpinski-info");
const sierpinskiNextButton = document.getElementById("sierpinski-next-button");
const sierpinskiDoneButton = document.getElementById("sierpinski-done-button");

// Each level gets the next color in this list
const sierpinskiColors = ["#2a6f97", "#e76f51", "#2a9d8f", "#e9c46a", "#8e44ad", "#f4a261", "#264653", "#d62828"];

// How many times the big outer triangle can be divided before its pieces get
// smaller than a pixel or two. Each half-size triangle gets one step less.
const finestStep = 8;

// Every group of same-colored triangles drawn so far. Each group remembers
// its triangles, its color, how many times they've been divided, the most
// they can be divided, and their size (0 = outer, 1 = half size, 2 = quarter...).
let levels = [];

// The process works in rounds. Round 0 fills the holes of the outer triangle,
// one level at a time: the 1 big middle hole, then the 3 smaller holes, then 9...
// Round 1 does the same inside every half-size triangle, round 2 inside every
// quarter-size triangle, and so on, until the holes are too small to see.
let round = 0;
let levelInRound = 0;

// Works out which round and level come next, or null if everything is done.
function nextLevelPosition() {
  let r = round;
  let k = levelInRound + 1;
  if (finestStep - r - k < 1) {
    // This round's holes are too small now: start the next round
    r++;
    k = 1;
  }
  if (finestStep - r - k < 1) {
    return null;
  }
  return { round: r, level: k };
}

// Draws the triangle with corners a, b, c, divided "depth" more times.
function drawSierpinski(context, a, b, c, depth) {
  if (depth === 0) {
    // No more dividing: just fill in this triangle
    context.beginPath();
    context.moveTo(a.x, a.y);
    context.lineTo(b.x, b.y);
    context.lineTo(c.x, c.y);
    context.closePath();
    context.fill();
    return;
  }

  // Find the middle of each side
  const ab = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const bc = { x: (b.x + c.x) / 2, y: (b.y + c.y) / 2 };
  const ca = { x: (c.x + a.x) / 2, y: (c.y + a.y) / 2 };

  // Draw the three corner triangles, skipping the middle one
  drawSierpinski(context, a, ab, ca, depth - 1);
  drawSierpinski(context, ab, b, bc, depth - 1);
  drawSierpinski(context, ca, bc, c, depth - 1);
}

// Returns the empty middle triangles ("holes") created when the triangle
// a, b, c is divided for the depth-th time. Depth 1 gives 1 hole, depth 2
// gives 3, depth 3 gives 9, and so on.
function findHoles(a, b, c, depth) {
  const ab = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const bc = { x: (b.x + c.x) / 2, y: (b.y + c.y) / 2 };
  const ca = { x: (c.x + a.x) / 2, y: (c.y + a.y) / 2 };

  if (depth === 1) {
    return [{ a: ab, b: bc, c: ca }]; // the middle triangle
  }

  // Otherwise, collect the holes from each of the three corner triangles
  return findHoles(a, ab, ca, depth - 1)
    .concat(findHoles(ab, b, bc, depth - 1))
    .concat(findHoles(ca, bc, c, depth - 1));
}

function showSierpinskiStep() {
  const context = sierpinskiCanvas.getContext("2d");
  context.clearRect(0, 0, sierpinskiCanvas.width, sierpinskiCanvas.height);

  // Draw every level, each in its own color
  for (const level of levels) {
    context.fillStyle = level.color;
    for (const t of level.triangles) {
      drawSierpinski(context, t.a, t.b, t.c, level.step);
    }
  }

  const current = levels[levels.length - 1];
  const count = current.triangles.length;
  sierpinskiInfo.textContent =
    "Round " + (round + 1) + ", level " + levelInRound +
    " (" + count + (count === 1 ? " triangle" : " triangles") + "), step " + current.step;

  // Nothing left to do once the current level is fully divided
  // and there's no next level
  sierpinskiNextButton.disabled = current.step >= current.maxStep && nextLevelPosition() === null;
}

// Open the pop-up, starting over from a single triangle
sierpinskiButton.addEventListener("click", function () {
  const width = sierpinskiCanvas.width;
  const height = sierpinskiCanvas.height;
  const outer = {
    a: { x: width / 2, y: 0 },        // top
    b: { x: 0, y: height },           // bottom left
    c: { x: width, y: height },       // bottom right
  };
  levels = [{
    triangles: [outer],
    color: sierpinskiColors[0],
    step: 0,
    maxStep: finestStep,
    size: 0,
  }];
  round = 0;
  levelInRound = 0;
  showSierpinskiStep();
  sierpinskiDialog.showModal();
});

sierpinskiNextButton.addEventListener("click", function () {
  const current = levels[levels.length - 1];

  if (current.step < current.maxStep) {
    // Still room to divide: divide every triangle in this level once more
    current.step++;
  } else {
    const next = nextLevelPosition();
    if (next === null) {
      return; // everything is done
    }
    round = next.round;
    levelInRound = next.level;

    // This round works inside every triangle of size "round"
    // (e.g. round 1 = every half-size triangle drawn so far)
    let parents = [];
    for (const group of levels) {
      if (group.size === round) {
        parents = parents.concat(group.triangles);
      }
    }

    // Fill the next level of holes inside all of them, in a new color
    let holes = [];
    for (const p of parents) {
      holes = holes.concat(findHoles(p.a, p.b, p.c, levelInRound));
    }
    const size = round + levelInRound;
    levels.push({
      triangles: holes,
      color: sierpinskiColors[levels.length % sierpinskiColors.length],
      step: 0,
      maxStep: finestStep - size,
      size: size,
    });
  }

  showSierpinskiStep();
});

sierpinskiDoneButton.addEventListener("click", function () {
  sierpinskiDialog.close();
});
