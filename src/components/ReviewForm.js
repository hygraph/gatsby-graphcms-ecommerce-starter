import React from 'react';
import useForm from 'react-hook-form';
import { useMutation } from 'graphql-hooks';

import Input from './Input';
import Textarea from './Textarea';

const CREATE_REVIEW_MUTATION = `mutation submitReview($input: SubmitReviewInput!) {
  submitReview(input: $input) {
    id
  }
}`;

function ReviewForm({ productId }) {
  const { handleSubmit, register, setError, formState } = useForm();
  const { isSubmitting } = formState;
  const [submitReview] = useMutation(CREATE_REVIEW_MUTATION);

  const onSubmit = async values => {
    try {
      const data = await submitReview({
        variables: {
          input: { ...values, productId },
        },
      });

      console.log(data);
    } catch (err) {
      setError(
        'submitReview',
        'somethingWentWrong',
        err.message || 'Unable to submit your review. Please try again.'
      );
    }
  };

  const ratings = [
    {
      label: 'Not good',
      value: 1,
    },
    {
      label: "It's ok",
      value: 2,
    },
    {
      label: 'Meh',
      value: 3,
    },
    {
      label: 'Good',
      value: 4,
    },
    {
      label: 'Great',
      value: 5,
    },
  ];

  return (
    <div className="mb-6 border-2 border-gainsboro rounded">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex">
          <div className="md:w-1/4 p-6 bg-gainsboro flex justify-center items-center">
            <p className="text-slategray text-lg font-bold">
              Write your own review
            </p>
          </div>

          <div className="md:w-3/4 p-6">
            <div className="mb-3 md:mb-6">
              <div className="md:flex -mx-6">
                {ratings.map(({ label, value }) => (
                  <div key={value} className="md:w-1/5 px-6">
                    <div className="bg-gainsboro rounded p-3 flex flex-col items-center justify-center h-full">
                      <input
                        type="radio"
                        name="rating"
                        ref={register({ required: true })}
                        value={value}
                      />
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3 md:mb-6">
              <Input
                name="headline"
                placeholder="Review headline/summary"
                register={register({ required: true })}
              />
            </div>

            <div className="mb-3 md:mb-6">
              <Textarea
                name="message"
                placeholder="More detail"
                register={register({ required: true })}
                rows={5}
              />
            </div>

            <div className="md:flex -mx-3">
              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <Input
                  name="name"
                  placeholder="Your name"
                  register={register({ required: true })}
                />
              </div>

              <div className="md:w-1/2 mb-3 md:mb-6 px-3">
                <Input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  register={register({ required: true })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-primary rounded text-white px-3 py-2 h-10 focus:outline-none font-bold"
              disabled={isSubmitting}
            >
              Submit review
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
