let timeout;
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function circlemousefollower(xscale, yscale) {
  window.addEventListener("mousemove", (data) => {
    document.querySelector(
      "#mini-circle"
    ).style.transform = `translate(${data.clientX}px, ${data.clientY}px) scale(${xscale},${yscale})`;
  });
}

function firstpageanim() {
  let tl = gsap.timeline();
  tl.from("nav", {
    y: "15",
    opacity: 0,
    delay: -0.1,
    duration: 1.5,
    ease: Expo.easInOut,
  }).to(".bounding-element", {
    y: 0,
    ease: Expo.easInOut,
    duration: 1.3,
    delay: -1,
    stagger: 0.2,
  });
}

function ovalCircle() {
  let xscale = 1;
  let yscale = 1;

  let previousX = 0;
  let previousY = 0;

  window.addEventListener("mousemove", (dets) => {
    clearTimeout(timeout);
    let diffx = dets.clientX - previousX;
    previousX = dets.clientX;

    let diffy = dets.clientY - previousY;
    previousY = dets.clientY;

    xscale = gsap.utils.clamp(0.8, 1.2, diffx);
    yscale = gsap.utils.clamp(0.8, 1.2, diffy);

    circlemousefollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#mini-circle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}

circlemousefollower();
firstpageanim();
ovalCircle();

document.querySelectorAll(".elem").forEach((elem) => {
  let positionx = 0;
  let diffx;
  elem.addEventListener("mouseleave", () => {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
    });
  });
  elem.addEventListener("mousemove", (details) => {
    let diffy = details.clientY - elem.getBoundingClientRect().top;
    diffx = details.clientX - positionx;
    positionx = details.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: "Power3.Out",
      top: diffy,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffx),
    });
  });
});
