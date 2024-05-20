import React from 'react';
import '../CSS/testimonial-blog.css';
import Navbar from './navbar';

const Testimonial = () => {

    const testimonials = [
        {
          id: 1,
          name: "John Doe",
          text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          full_text: "something...........................",
          imageUrl: "https://firebasestorage.googleapis.com/v0/b/loknathcatererandtravels.appspot.com/o/download-card.jpeg?alt=media&token=cfd1052f-d62c-47bf-a740-214f803b4cd4"
        },
        {
          id: 2,
          name: "Jane Smith",
          text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          full_text: "something...........................",
          imageUrl: "https://firebasestorage.googleapis.com/v0/b/loknathcatererandtravels.appspot.com/o/download-card.jpeg?alt=media&token=cfd1052f-d62c-47bf-a740-214f803b4cd4"
        },
      ];
  return (
    <div className="full-page">
        <Navbar/>
    <div className="testimonial-container-blog">
    <div className="testimonial-header-blog">
        <h1>What Our Clients Say</h1>
    </div>
    <div className="testimonial-content-blog">
        <img src={testimonials.imageURL} alt="Author" className="author-image" />
        <p className="testimonial-text-blog">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum, massa at cursus viverra, justo erat ultrices leo, nec ultrices nisi urna vel arcu. Nulla facilisi. In hac habitasse platea dictumst. Integer ac leo sed orci facilisis dignissim. Cras et urna id massa dapibus ultrices. Etiam eu nulla in libero sollicitudin efficitur non ac ligula. Curabitur consectetur lorem at risus gravida, in pulvinar orci interdum."
        </p>
        <p className="author-name-blog">John Doe</p>
    </div>
</div>
</div>
  );
};

export default Testimonial;