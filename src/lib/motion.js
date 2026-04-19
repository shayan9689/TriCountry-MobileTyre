export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const staggerParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export const staggerItem = fadeUp;

export const cardHoverSpring = { type: "spring", stiffness: 300, damping: 20 };

export const buttonHover = { scale: 1.03, y: -2 };
export const buttonTap = { scale: 0.97 };

export const cardHover = { scale: 1.02, y: -4 };

export const instantVisible = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export const instantStaggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
};
