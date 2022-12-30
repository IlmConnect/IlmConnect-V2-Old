import FroalaEditor from 'react-froala-wysiwyg'; 
  
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

// Plugins
import { useEffect } from 'react';
import 'froala-editor/js/plugins/align.min';
import 'froala-editor/js/plugins/code_beautifier.min';
import 'froala-editor/js/plugins/code_view.min';
import 'froala-editor/js/plugins/colors.min';
import 'froala-editor/js/plugins/draggable.min';
import 'froala-editor/js/plugins/emoticons.min';
import 'froala-editor/js/plugins/file.min';
import 'froala-editor/js/plugins/font_family.min';
import 'froala-editor/js/plugins/font_size.min';
import 'froala-editor/js/plugins/fullscreen.min';
import 'froala-editor/js/plugins/help.min';
import 'froala-editor/js/plugins/image.min';
import 'froala-editor/js/plugins/line_height.min';
import 'froala-editor/js/plugins/link.min';
import 'froala-editor/js/plugins/lists.min';
import 'froala-editor/js/plugins/paragraph_format.min';
import 'froala-editor/js/plugins/paragraph_style.min';
import 'froala-editor/js/plugins/print.min';
import 'froala-editor/js/plugins/quote.min';
import 'froala-editor/js/plugins/table.min';
import 'froala-editor/js/plugins/url.min';
import 'froala-editor/js/plugins/video.min';
import 'froala-editor/js/plugins/word_paste.min';
// CSS
import 'froala-editor/css/plugins/code_view.min.css';
import 'froala-editor/css/plugins/colors.min.css';
import 'froala-editor/css/plugins/draggable.min.css';
import 'froala-editor/css/plugins/emoticons.min.css';
import 'froala-editor/css/plugins/file.min.css';
import 'froala-editor/css/plugins/fullscreen.min.css';
import 'froala-editor/css/plugins/help.min.css';
import 'froala-editor/css/plugins/image.min.css';
import 'froala-editor/css/plugins/table.min.css';
import 'froala-editor/css/plugins/video.min.css';

const key = 'FSC2H-9G1A17B2B3A1D2rXYf1VPUGRHYZNRJb2JVOOe1HAb2zA3B2A1A1F4F1F1A10D2C7=='
const options = {
	
	
	toolbarButtons:{
		'moreText': {
			'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
		},
		'moreParagraph': {
			'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
		},
		'moreRich': {
			'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
		},
		'moreMisc': {
			'buttons': ['undo', 'redo', 'fullscreen', 'print', 'spellChecker', 'selectAll', 'html', 'help'],
			'align': 'right',
			'buttonsVisible': 2
		}
	},
	toolbarButtonsSM: {
		'moreText': {
			'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
			'buttonsVisible': 2
		},
		'moreParagraph': {
			'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
			'buttonsVisible': 2
		},
		'moreRich': {
			'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
			'buttonsVisible': 2
		},
		'moreMisc': {
			'buttons': ['undo', 'redo', 'fullscreen', 'print', 'spellChecker', 'selectAll', 'html', 'help'],
			'align': 'right',
			'buttonsVisible': 2
		}
	},
	toolbarButtonsXS: {
		'moreText': {
			'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
			'buttonsVisible': 0
		},
		'moreParagraph': {
			'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
			'buttonsVisible': 0
		},
		'moreRich': {
			'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
			'buttonsVisible': 0
		},
		'moreMisc': {
			'buttons': ['undo', 'redo', 'fullscreen', 'print', 'spellChecker', 'selectAll', 'html', 'help'],
			'align': 'right',
			'buttonsVisible': 2
		}
	},
}

type FroalaModel = string | object | undefined | null

interface Event {
	target: {
		value: FroalaModel
	}
}

interface Props {
	value?: FroalaModel
	onChange?: (e: Event) => void
}

const HtmlEditor: React.FC<Props> = ({
	value,
	onChange,
}) => {
	useEffect(() => {}, [])
	return (
		<FroalaEditor 
			tag='textarea'
			key={key}
			config={{
				attribution: false,
				heightMin: 200,
				toolbarSticky: false,
				options,
			}}
			model={value}
			onModelChange={(m: FroalaModel) => onChange?.({ target: { value: m }})}
		/>
	)
}

export default HtmlEditor
