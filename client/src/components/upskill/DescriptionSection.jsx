// DescriptionSection.jsx
import React from 'react';

export const DescriptionSection = () => {
  return (
    <div className="description-section">
      <h4 className="description-title">
        <span className="description-bar"></span>
        Description
      </h4>
      <p className="description-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Tempor commodo ullamcorper a lacus vestibulum sed arcu non. Habitant morbi tristique senectus et netus et malesuada fames. Sit amet est placerat in egestas erat imperdiet sed. Cras fermentum odio eu feugiat pretium nibh. Mattis nunc sed blandit libero volutpat. Morbi tristique senectus et netus et malesuada fames ac turpis.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, explicabo maiores commodi perspiciatis eius molestias obcaecati blanditiis dicta earum non, consequuntur hic, quibusdam laborum omnis consequatur velit facere laboriosam quas quasi! Porro quasi eligendi iusto magnam quia? Aut suscipit corporis dicta laborum dolor sunt saepe velit iste doloremque nam hic modi excepturi iusto exercitationem, quos fugit doloribus quis ipsum odit? Reprehenderit molestias dicta, iusto ipsa minima ipsum perferendis qui voluptas doloremque quasi culpa accusantium id commodi corrupti mollitia quis illum vitae suscipit. Sit blanditiis perferendis quaerat repudiandae nam maiores esse ex et officiis. Quam, corrupti blanditiis distinctio neque omnis modi nesciunt! Distinctio delectus nihil temporibus eius, magnam eaque at dolorum odit nisi ducimus corrupti earum, doloribus facilis vitae velit fugit, sunt ipsam esse quisquam quis reprehenderit. Quas, animi cupiditate nostrum neque iste porro autem exercitationem odit reiciendis dolores atque facilis libero rerum blanditiis veniam aliquid. Hic ad non totam iure quisquam quam accusamus at, iusto architecto dolorum illum excepturi amet tempora repudiandae pariatur distinctio eos! Sequi, a! Inventore sit rerum eius possimus labore asperiores quod voluptates. Distinctio animi dolor esse minus ratione vero id dolorum quas, commodi labore quaerat voluptatibus praesentium velit sed aliquid laborum? Deleniti quod cumque debitis ipsa.</p>

      <style>{`
        .description-section {
          margin: 1.5rem 0;
          padding: 0 1rem;
        }

        .description-title {
          display: flex;
          align-items: center;
          font-size: 1.25rem;
          font-weight: 600;
          color: #000;
          margin-bottom: 0.75rem;
        }

        .description-bar {
          width: 4px;
          height: 20px;
          background-color: #009688;
          margin-right: 10px;
        }

        .description-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #333;
        }
      `}</style>
    </div>
  );
};


