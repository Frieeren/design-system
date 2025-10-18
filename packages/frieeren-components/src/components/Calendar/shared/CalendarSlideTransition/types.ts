type CalendarVariants = "month" | "week";
type SlideDirection = "left" | "right";

type CalendarSlideTransitionProps = {
  calendarVariant: CalendarVariants;
  children: React.ReactElement;
  transitionKey: string;
  slideDirection: SlideDirection;
  activeTransition: boolean;
};

export type { CalendarVariants, SlideDirection, CalendarSlideTransitionProps };
