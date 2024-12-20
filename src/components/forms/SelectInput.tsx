import clsx from 'clsx';
import * as React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';

export type SelectInputProps = {
  label: string;
  id: string;
  placeholder?: string;
  helperText?: string;
  type?: string;
  readOnly?: boolean;
  validation?: RegisterOptions;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'select'>;

const SelectInput = ({
  label,
  helperText,
  id,
  placeholder,
  readOnly = false,
  children,
  validation,
  className,
  ...rest
}: SelectInputProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const value = watch(id);

  // Add disabled and selected attribute to option, will be used if readonly
  const readOnlyChildren = React.Children.map<React.ReactNode, React.ReactNode>(
    children,
    (child) => {
      if (React.isValidElement(child)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return React.cloneElement(child as any, {
          disabled: (child.props as typeof rest)?.value !== rest?.defaultValue,
          // selected: child.props.value === rest?.defaultValue,
        });
      }
    },
  );

  return (
    <div className={clsx(className)}>
      <label htmlFor={id} className='block text-sm font-normal text-primary-50'>
        {label}
      </label>
      <div className='relative mt-1'>
        <select
          {...register(id, validation)}
          // defaultValue to value blank, will get overriden by ...rest if needed
          defaultValue=''
          {...rest}
          name={id}
          id={id}
          className={clsx(
            readOnly
              ? 'cursor-not-allowed border-gray-900 bg-gray-800 focus:border-gray-900 focus:ring-0'
              : errors[id]
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-900 focus:border-primary-500 focus:ring-primary-500',
            'block w-full rounded-md p-2 shadow-sm',
            { 'text-gray-100': value === '' },
          )}
          aria-describedby={id}
        >
          {placeholder && (
            <option value='' disabled hidden>
              {placeholder}
            </option>
          )}
          {readOnly ? readOnlyChildren : children}
        </select>

        {errors[id] && (
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            <HiExclamationCircle className='text-xl text-red-500' />
          </div>
        )}
      </div>
      <div className='mt-1'>
        {helperText && <p className='text-xs text-gray-100'>{helperText}</p>}
        {errors[id] && (
          <span className='text-sm text-red-500'>
            {errors[id].message as string}
          </span>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
