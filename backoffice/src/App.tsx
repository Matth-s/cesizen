// import { Puck } from '@puckeditor/core';
// import '@puckeditor/core/puck.css';
// import type { JSX } from 'react';

// const config = {
//   components: {
//     HeadingBlock: {
//       fields: {
//         content: {
//           type: 'text',
//           label: 'Titre',
//         },
//         align: {
//           type: 'select',
//           label: 'Alignement',
//           options: [
//             { label: 'Gauche', value: 'left' },
//             { label: 'Centre', value: 'center' },
//             { label: 'Droite', value: 'right' },
//           ],
//         },
//         marginBottom: {
//           type: 'select',
//           label: 'Espacement bas',
//           options: [
//             { label: 'Petit', value: 'mb-2' },
//             { label: 'Moyen', value: 'mb-4' },
//             { label: 'Grand', value: 'mb-6' },
//           ],
//         },
//       },

//       render: ({
//         content,
//         align,
//         marginBottom,
//       }: {
//         content: string;
//         align?: string;
//         marginBottom?: string;
//       }) => {
//         return (
//           <h1
//             className={`text-lg font-bold ${
//               align === 'center'
//                 ? 'text-center'
//                 : align === 'right'
//                   ? 'text-right'
//                   : 'text-left'
//             } ${marginBottom || 'mb-2'}`}
//           >
//             {content}
//           </h1>
//         );
//       },
//     },
//   },
// };

// // Describe the initial data
// const initialData = {};

// // Save the data to your database
// const save = (data) => {
//   console.log(data);
// };

// // Render Puck editor
// export const App = () => {
//   return <Puck config={config} data={initialData} onPublish={save} />;
// };

// export default App;
