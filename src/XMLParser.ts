import {XMLParser as FastXMlParser} from 'fast-xml-parser';

const xmlParser = new FastXMlParser({
	ignoreAttributes: false,
	attributeNamePrefix: '',
});

export default xmlParser;
