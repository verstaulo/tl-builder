import {
  //   MouseEventHandler,
  ReactNode,
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface Props {
  mode: "custom" | "default";
  open?: boolean;
  className?: string;
  openHandler?: () => boolean;
  closeHandler?: () => boolean;
  children: ReactNode;
}

interface Context {
  isOpen: boolean;
  openHandler?: () => void;
  closeHandler?: () => void;
}

const TooltipContext = createContext<Context>({ isOpen: false });

// let toggleOpen: MouseEventHandler<HTMLDivElement>;

const Tooltip = ({ mode, openHandler, closeHandler, open = false, className, children }: Props) => {
  const [localOpen, setLocalOpen] = useState<boolean>(() => (mode === "custom" ? open : false));
  const rootNode = useRef<HTMLDivElement | null>(null);

  const onMouseEnter = () => {
    // console.log("MOUSE ENTER");
    if (openHandler) {
      setLocalOpen(openHandler());
    } else setLocalOpen(true);
  };
  const onMouseLeave = () => {
    // console.log("MOUSE LEAVE");
    if (closeHandler) {
      setLocalOpen(closeHandler());
    } else setLocalOpen(false);
  };
  const contextValue =
    // mode === "custom"
    //   ? {
    //       isOpen: open,
    //       openHandler: openHandler,
    //       closeHandler: closeHandler,
    //     }
    //   :
    { isOpen: localOpen, openHandler: onMouseEnter, closeHandler: onMouseLeave };

  return (
    <TooltipContext.Provider value={contextValue}>
      <div ref={rootNode} className={className || ""}>
        {children}
      </div>
    </TooltipContext.Provider>
  );
};
export default Tooltip;

interface TriggerProps {
  children: ReactNode;
}
Tooltip.Trigger = function Trigger({ children }: TriggerProps) {
  const { openHandler, closeHandler } = useContext(TooltipContext);
  return (
    <div onMouseEnter={openHandler} onMouseLeave={closeHandler}>
      {children}
    </div>
  );
};

interface ContentProps {
  className?: string;
  children: ReactNode;
}

Tooltip.Content = function Content({ children, className }: ContentProps) {
  const { isOpen } = useContext(TooltipContext);
  const contentNode = useRef<HTMLDivElement | null>(null);
  const firstRenderOffset = useRef(0);

  useLayoutEffect(() => {
    console.log("FIRST", firstRenderOffset.current);
    

    if (contentNode.current) {
      const contentY =
        contentNode.current?.getBoundingClientRect().y + contentNode.current.offsetHeight;
      const windowY = window.innerHeight;

      console.log("CONTENT Y + HEIGHT", contentY);

      const style = `left:100%; ${
        contentY > windowY || firstRenderOffset.current < 0 ? "bottom:100%" : "top:100%"
      }`;

      contentNode.current?.setAttribute("style", style);
      firstRenderOffset.current = windowY - contentY;
    }
  });

  return (
    isOpen && (
      <div ref={contentNode} className={`absolute z-[99] ${className || ""}`}>
        {children}
      </div>
    )
  );
};
