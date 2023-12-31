'use client';
import { useFormStatus, useFormState } from 'react-dom';
import { createTaskCustom } from '@/utils/actions';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary join-item"
      disabled={pending}
    >
      {pending ? 'Please wait...' : 'Create task'}
    </button>
  );
};

const initialState = { msg: null };

const TaskFormCustom = () => {
  const [state, formAction] = useFormState(createTaskCustom, initialState);

  useEffect(() => {
    console.log(state);
    if (state.msg === 'error') {
      toast.error('There was an error');
      return;
    }
    if (state.msg === 'success') {
      toast.success('Task correctly created');
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="join w-full">
        <input
          type="text"
          className="input input-bordered join-item w-full"
          placeholder="type here"
          name="content"
          required
        />
        <SubmitBtn />
      </div>
    </form>
  );
};
export default TaskFormCustom;
