import React, {
  ComponentProps,
  createContext,
  MouseEventHandler,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface Props extends ComponentProps<"div"> {
  className?: string;
  children: React.ReactNode;
}

interface Context {
  open: boolean;
  container: HTMLDivElement | null;
}
const TooltipContext = createContext<Context>({ open: false, container: null });

let toggleOpen: MouseEventHandler<HTMLDivElement>;

export const Tooltip = ({ children, className, ...otherProps }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerNode = useRef<HTMLDivElement>(null);

  toggleOpen = () => setIsOpen((open) => !open);

  return (
    <TooltipContext.Provider
      value={{ open: isOpen, container: containerNode.current }}
      {...otherProps}
    >
      <div ref={containerNode} className={`relative ${className || ""}`}>
        {children}
      </div>
    </TooltipContext.Provider>
  );
};

Tooltip.Trigger = function Trigger({ children, className }: Props) {
  return (
    <div onMouseEnter={toggleOpen} onMouseLeave={toggleOpen} className={className}>
      {children}
    </div>
  );
};

Tooltip.Content = function Content({ children, className }: Props) {
  const { open, container } = useContext(TooltipContext);
  const contentNode = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const y =
      window.innerHeight -
      (contentNode.current && container
        ? contentNode.current.offsetHeight + container.offsetTop + container.offsetHeight
        : 0);
    const x =
      window.innerWidth -
      (contentNode.current && container
        ? contentNode.current.offsetWidth + container.offsetLeft + container.offsetWidth
        : 0);

    const style = `${x < 0 ? "left:0" : "left:100%"}; ${y < 0 ? "bottom:100%" : "top:100%"}`;

    contentNode.current?.setAttribute("style", style);
  });

  return (
    open && (
      <div ref={contentNode} className={`pointer-events-none absolute z-[99] ${className || ""}`}>
        {children}
      </div>
    )
  );
};
