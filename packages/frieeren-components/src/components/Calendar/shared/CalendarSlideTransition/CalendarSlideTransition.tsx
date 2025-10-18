import { motion, AnimatePresence } from "motion/react";
import cx from "classnames";
import type { CalendarSlideTransitionProps, SlideDirection } from "./types";
import "./CalendarSlideTransition.scss";

export const CalendarSlideTransition = ({
  calendarVariant = "month",
  children,
  transitionKey,
  slideDirection,
  activeTransition
}: CalendarSlideTransitionProps) => {
  const containerClassName = cx({
    "calendar-slide-transition--container": true,
    [`calendar-slide-transition--container--${calendarVariant}`]: calendarVariant
  });

  if (!activeTransition) {
    return <div className={containerClassName}>{children}</div>;
  }

  const slideVariants = {
    enter: (direction: SlideDirection) => ({
      x: direction === "left" ? "100%" : "-100%",
      zIndex: 1
    }),
    center: {
      x: 0,
      zIndex: 1
    },
    exit: (direction: SlideDirection) => ({
      x: direction === "left" ? "-100%" : "100%",
      zIndex: 0
    })
  };

  return (
    <div className={containerClassName}>
      <AnimatePresence custom={slideDirection}>
        <motion.div
          key={transitionKey}
          custom={slideDirection}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.235,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="calendar-slide-transition--content"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
