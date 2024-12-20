import clsx from 'clsx';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';

export type InputProps = {
  label: string;
  id: string;
  placeholder?: string;
  helperText?: string;
  type?: string;
  readOnly?: boolean;
  hideError?: boolean;
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<'input'>;

const Input = ({
  label,
  placeholder = '',
  helperText,
  id,
  type = 'text',
  readOnly = false,
  hideError = false,
  validation,
  className,
  ...rest
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={clsx(className)}>
      <label htmlFor={id} className='block text-sm font-normal text-primary-50'>
        {label}
      </label>
      <div className='relative mt-1'>
        <input
          {...register(id, validation)}
          {...rest}
          type={type}
          name={id}
          id={id}
          readOnly={readOnly}
          className={clsx(
            readOnly
              ? 'cursor-not-allowed border-gray-900 bg-gray-700 focus:border-gray-900 focus:ring-0'
              : errors[id]
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-900 focus:border-primary-500 focus:ring-primary-500',
            'block w-full rounded-md p-2 shadow-sm',
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />

        {!hideError && errors[id] && (
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            <HiExclamationCircle className='text-xl text-red-500' />
          </div>
        )}
      </div>
      <div className='mt-1'>
        {helperText && <p className='text-xs text-gray-100'>{helperText}</p>}
        {!hideError && errors[id] && (
          <span className='text-sm text-red-500'>
            {errors[id].message as string}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
