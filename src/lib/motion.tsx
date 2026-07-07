import React, { forwardRef } from "react";

type MotionOnlyProps = {
  animate?: unknown;
  custom?: unknown;
  exit?: unknown;
  initial?: unknown;
  layout?: unknown;
  transition?: unknown;
  variants?: unknown;
  viewport?: unknown;
  whileHover?: unknown;
  whileInView?: unknown;
  whileTap?: unknown;
};

type MotionProps<T> = T & MotionOnlyProps;

const stripMotionProps = <T extends object>(props: MotionProps<T>): T => {
  const {
    animate,
    custom,
    exit,
    initial,
    layout,
    transition,
    variants,
    viewport,
    whileHover,
    whileInView,
    whileTap,
    ...domProps
  } = props;

  void animate;
  void custom;
  void exit;
  void initial;
  void layout;
  void transition;
  void variants;
  void viewport;
  void whileHover;
  void whileInView;
  void whileTap;

  return domProps as T;
};

const Div = forwardRef<HTMLDivElement, MotionProps<React.HTMLAttributes<HTMLDivElement>>>((props, ref) => (
  <div ref={ref} {...stripMotionProps(props)} />
));
Div.displayName = "MotionDiv";

const Button = forwardRef<HTMLButtonElement, MotionProps<React.ButtonHTMLAttributes<HTMLButtonElement>>>(
  (props, ref) => <button ref={ref} {...stripMotionProps(props)} />
);
Button.displayName = "MotionButton";

const Circle = forwardRef<SVGCircleElement, MotionProps<React.SVGProps<SVGCircleElement>>>((props, ref) => (
  <circle ref={ref} {...stripMotionProps(props)} />
));
Circle.displayName = "MotionCircle";

const H1 = forwardRef<HTMLHeadingElement, MotionProps<React.HTMLAttributes<HTMLHeadingElement>>>((props, ref) => (
  <h1 ref={ref} {...stripMotionProps(props)} />
));
H1.displayName = "MotionH1";

const Li = forwardRef<HTMLLIElement, MotionProps<React.LiHTMLAttributes<HTMLLIElement>>>((props, ref) => (
  <li ref={ref} {...stripMotionProps(props)} />
));
Li.displayName = "MotionLi";

const P = forwardRef<HTMLParagraphElement, MotionProps<React.HTMLAttributes<HTMLParagraphElement>>>((props, ref) => (
  <p ref={ref} {...stripMotionProps(props)} />
));
P.displayName = "MotionP";

// eslint-disable-next-line react-refresh/only-export-components
export const motion = {
  button: Button,
  circle: Circle,
  div: Div,
  h1: H1,
  li: Li,
  p: P,
};

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>;
