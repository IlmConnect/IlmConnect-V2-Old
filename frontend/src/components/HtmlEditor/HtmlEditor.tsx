import React, { forwardRef, SyntheticEvent, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

interface Event {
	target: {
		value?: string
	}
}

interface Props {
	value?: string
	onChange?: (v: string | undefined) => void
	disabled?: boolean
	hideAllBars?: boolean
}

// TODO: make editor disableable
// https://froala.com/wysiwyg-editor/docs/framework-plugins/react/ -> manual instantiation
const HtmlEditor: React.FC<Props> = forwardRef<any, Props>((
	{
		value,
		onChange,
		disabled,
		hideAllBars
	}, ref
) => {
	return (
		<Editor
			onInit={(evt, editor) => ref && typeof ref === 'object' ? ref.current = editor : undefined}
			apiKey='c129a7e4fvrker1hh3wu3erff44558xt0konh62uqh3ew45x'
			init={{
				height: 400,
				toolbar: !hideAllBars,
				menubar: !hideAllBars,
				statusbar: !hideAllBars
			}}
			initialValue={value}
			onEditorChange={(value, editor) => onChange?.(value)}
			disabled={disabled}
		/>
	)
})

export default HtmlEditor
