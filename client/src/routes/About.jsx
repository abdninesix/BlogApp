import React from 'react'

const About = () => {
  return (
    <div className='flex flex-col gap-8 duration-200'>
      <h1 className='flex justify-center text-2xl'>About this site</h1>

      <section className="">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
            {/* Image Section */}
            <div className="w-3/5 md:w-1/2">
              <img
                src="/favicon.svg"
                alt="About Us"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-center md:text-left">
                About Us
              </h2>
              <p className="mt-4 text-lg">
                Welcome to our blog! We&apos;re passionate about sharing insightful articles, stories, and experiences with you.
                Our goal is to provide useful content that educates, entertains, and inspires. Whether you&apos;re here for the latest news or thoughtful opinions, we hope to offer something valuable with every post.
              </p>
              <p className="mt-4 text-lg">
                We believe in the power of words to change the world. Join us on our journey to explore new ideas, share knowledge, and build a community of curious minds. If you have any questions or would like to connect, feel free to reach out to us!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About