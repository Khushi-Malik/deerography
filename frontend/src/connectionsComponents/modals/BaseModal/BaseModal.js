import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";

function BaseModal({
  title = "title",
  trigger = undefined,
  initiallyOpen = true,
  footerElements,
  children,
  actionButtonText = "Continue",
  showActionButton = true,
}) {
  const [isOpen, setIsOpen] = React.useState(initiallyOpen);

  React.useEffect(() => {
    setIsOpen(initiallyOpen);
  }, [initiallyOpen]);

  function handleCloseEvent() {
    setIsOpen(false);
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {!!trigger && <AlertDialogTrigger>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent
        handleMouseDownOnOverlay={handleCloseEvent}
        onEscapeKeyDown={handleCloseEvent}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        {/* Wrap description content in a div to avoid nesting <h3> inside <p> */}
        <div>
          <AlertDialogDescription>{children}</AlertDialogDescription>
        </div>
        <AlertDialogFooter>
          {footerElements}
          {showActionButton && (
            <AlertDialogAction onClick={() => setIsOpen(false)}>
              {actionButtonText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default BaseModal;
