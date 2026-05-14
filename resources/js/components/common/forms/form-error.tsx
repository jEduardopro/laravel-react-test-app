import { FieldError } from '@/components/ui/field';
import type { FieldError as FieldErrorType } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type FormErrorProps = {
    error: FieldErrorType | undefined;
    params?: Record<string, any>
}

const FormError = ({ error, params }: FormErrorProps) => {
    const { t } = useTranslation()

    return (
        <div>
            {error && (
                <>
                    <FieldError
                        errors={[{ message: t(error.message!, params) }]}
                    />
                </>
            )}
        </div>
    )
}

export default FormError
