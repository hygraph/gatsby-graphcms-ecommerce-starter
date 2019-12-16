import React from 'react';
import useForm from 'react-hook-form';
import { useMutation } from 'graphql-hooks';

import Input from './Input';

const CREATE_REVIEW_MUTATION = `mutation createReview($input: SubmitReviewInput!) {
  createReview(input: $input) {
    id
  }
}`;

function ReviewForm({ productId }) {
  const { handleSubmit, register, setError, formState } = useForm();
  const { isSubmitting } = formState;
  const [createReview] = useMutation(CREATE_REVIEW_MUTATION);

  const onSubmit = async values => {
    try {
      const data = await createReview({
        variables: {
          ...values,
          productId,
        },
      });

      console.log(data);
    } catch (err) {
      setError(
        'createReview',
        'somethingWentWrong',
        err.message || 'Unable to submit your review. Please try again.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded bg-gainsboro p-3 md:p-6 my-3 md:my-6">
        <div className="mb-3 md:mb-6">
          <Input
            name="name"
            placeholder="Name"
            register={register({ required: true })}
          />
        </div>

        <button
          type="submit"
          className="bg-primary rounded text-white px-3 py-2 h-10 focus:outline-none font-bold"
          disabled={isSubmitting}
        >
          Submit review
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
