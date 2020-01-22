import React from 'react';
import { useForm } from 'react-hook-form';
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
  const { isSubmitting, isSubmitted } = formState;
  const [submitReview] = useMutation(CREATE_REVIEW_MUTATION);

  if (isSubmitted)
    return (
      <p className="text-primary">
        Thank you for your review. We'll be in touch.
      </p>
    );

  const onSubmit = async ({ rating, ...values }) => {
    try {
      await submitReview({
        variables: {
          input: { productId, rating: parseInt(rating), ...values },
        },
      });
    } catch (err) {
      setError(
        'submitReview',
        'somethingWentWrong',
        err.message || 'Unable to submit review. Please try again.'
      );
    }
  };

  const ratings = [
    {
      label: 'Really Good',
      value: 5,
    },
    {
      label: 'Good',
      value: 4,
    },
    {
      label: 'Meh',
      value: 3,
    },
    {
      label: 'Bad',
      value: 2,
    },
    {
      label: 'Really Bad',
      value: 1,
    },
  ];

  return (
    <div className="mb-6 border-2 border-gainsboro rounded-lg">
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
                  <div
                    key={value}
                    className="product-rating md:w-1/5 px-6 mb-3 md:mb-0"
                  >
                    <input
                      id={`rating[${value}]`}
                      type="radio"
                      name="rating"
                      ref={register({ required: true })}
                      value={value}
                      className="opacity-0 fixed w-0"
                    />

                    <label
                      htmlFor={`rating[${value}]`}
                      className="bg-gainsboro border-2 border-transparent rounded-lg p-3 flex flex-col items-center justify-center h-full cursor-pointer hover:border-slategray"
                    >
                      {label}
                    </label>
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
              className="bg-primary rounded-lg text-white px-3 py-2 h-10 focus:outline-none font-bold"
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
