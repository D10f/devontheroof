import { RichText } from '@wordpress/block-editor';
import { SelectControl, Flex, FlexBlock } from '@wordpress/components';

wp.blocks.registerBlockType('sojourn/prism-syntax-highlighter', {
  title: 'Prism Highlighter',
  icon: 'shortcode',
  category: 'common',
  attributes: {
    content: { type: 'string' },
    language: { type: 'string' }
  },
  edit: EditComponent,
  save: () => null
});

function EditComponent ({ attributes, setAttributes }) {

  const { content, language } = attributes;
  const languageOptions = [
    { label: 'JavaScript', value: 'js' },
    { label: 'JSX', value: 'jsx' },
    { label: 'JSON', value: 'json' },
    { label: 'HTML', value: 'markup' },
    { label: 'CSS', value: 'css' },
    { label: 'PHP', value: 'php' },
    { label: 'Shell', value: 'shell' },
  ];

  const handleChange = value => setAttributes({ content: value });
  const handleOptionUpdate = value => setAttributes({ language: value });

  return (
    <>
      <SelectControl
        label="Language"
        value={language}
        onChange={handleOptionUpdate}
        options={languageOptions}
      />
      <pre style={{ padding: '20px', borderRadius: '3px', border: '1px solid #ddd' }}>
        <RichText
          tagName="code"
          value={content}
          onChange={handleChange}
          allowedFormats={[]}
          preserveWhiteSpace={true}
        />
      </pre>
    </>
  );
}

// <Flex>
// <FlexBlock>
// </FlexBlock>
// </Flex>
