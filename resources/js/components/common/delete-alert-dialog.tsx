import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

type DeleteAlertDialogProps = {
    resource: string;
    model: {
        id: string | number;
    };
};

const DeleteAlertDialog = (props: DeleteAlertDialogProps) => {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const onConfirm = () => {
        setIsDeleting(true);

        router.delete(`/${props.resource}/${props.model.id}`, {
            preserveScroll: true,

            onSuccess: () => {
                router.get(`/${props.resource}`, {}, {
                    replace: true,
                    showProgress: false,
                    onSuccess: () => {
                        toast(t('record_deleted_successfully'))
                    },
                    onFinish: () => {
                        setOpen(false)
                        setIsDeleting(false);
                    }
                })
            },

            onError: (errors) => {
                console.log(errors);

                toast.error(errors.message ? errors.message : t("something_went_wrong"), {duration: 30000, dismissible: true, closeButton: true});

                setOpen(false)
                setIsDeleting(false);
            }
        });
    };

    return (
        <AlertDialog
            open={open}
            onOpenChange={(value) => {
                if (!isDeleting) {
                    setOpen(value);
                }
            }}
        >
            <AlertDialogTrigger asChild>
                <Button
                    className="cursor-pointer"
                    size="xs"
                    variant="destructive"
                >
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {t("confirm_delete_title")}
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        {t("confirm_delete_description")}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="cursor-pointer"
                        disabled={isDeleting}
                    >
                        {t("cancel")}
                    </AlertDialogCancel>

                    <AlertDialogAction
                        className="cursor-pointer"
                        variant="destructive"
                        disabled={isDeleting}
                        onClick={(event) => {
                            event.preventDefault();
                            onConfirm();
                        }}
                    >
                        {isDeleting && (
                            <LoaderCircle className="animate-spin" />
                        )}

                        {isDeleting
                            ? t("deleting")
                            : t("delete")}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteAlertDialog;