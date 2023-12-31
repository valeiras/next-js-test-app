'use client';

import { deleteTaskCustom } from '@/utils/actions';
import { useFormStatus, useFormState } from 'react-dom';

const DeleteButton = () => {
  const { pending } = useFormStatus();
  <button type="submit" className="btn btn-xs btn-error">
    {pending ? 'wait...' : 'delete'}
  </button>;
};

const initialState = { msg: null };

const DeleteForm = ({ id }) => {
  const [state, formAction] = useFormState(deleteTaskCustom, initialState);

  useEffect(() => {
    if (state.msg === 'error') {
      toast.error('There was an error');
      return;
    }
    if (state.msg === 'success') {
      toast.success('Task correctly deleted');
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
    </form>
  );
};
export default DeleteForm;
