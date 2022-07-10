/** Built on top of the type definitions in @types/mdast */

import {Parent as UnistParent, Literal as UnistLiteral, Node} from 'unist'

export type ReferenceType = 'shortcut' | 'collapsed' | 'full'

/**
 * This map registers all node types that may be used where markdown block content is accepted.
 *
 * These types are accepted inside block quotes, list items, footnotes, and roots.
 *
 * This interface can be augmented to register custom node types.
 *
 * @example
 * declare module 'mdast' {
 *   interface BlockContentMap {
 *     // Allow using math nodes defined by `remark-math`.
 *     poem: Poem;
 *   }
 * }
 */
export interface BlockContentMap {
  // Shared with markdown
  paragraph: Paragraph
  heading: Heading
  thematicbreak: ThematicBreak
  list: List
  table: Table
  html: HTML
  // Different from markdown
  signature: Signature
  redirect: Redirect
  toc: TOC
  // Custom HTML tags:
  nowiki: Nowiki
  references: References
  gallery: Gallery
  math: Math
  syntaxHighlighting: SyntaxHighlighting
  // poem: Poem
  // hiero: Hiero
  // score: Score
}

/**
 * This map registers all node definition types.
 *
 * This interface can be augmented to register custom node types.
 *
 * @example
 * declare module 'mdast' {
 *   interface DefinitionContentMap {
 *     custom: Custom;
 *   }
 * }
 */
export interface DefinitionContentMap {
  definition: Definition
  footnoteDefinition: FootnoteDefinition
}

/**
 * This map registers all node types that are acceptable in a static phrasing context.
 *
 * This interface can be augmented to register custom node types in a phrasing context, including links and link
 * references.
 *
 * @example
 * declare module 'mdast' {
 *   interface StaticPhrasingContentMap {
 *     mdxJsxTextElement: MDXJSXTextElement;
 *   }
 * }
 */
export interface StaticPhrasingContentMap {
  text: Text
  emphasis: Emphasis
  strong: Strong
  html: HTML
  break: Break
  footnote: Footnote
  footnotereference: FootnoteReference
  // Custom HTML tags
  nowiki: Nowiki
  references: References
  gallery: Gallery
  math: Math
  syntaxhighlighting: SyntaxHighlighting
}

/**
 * This map registers all node types that are acceptable in a (interactive) phrasing context (so not in links).
 *
 * This interface can be augmented to register custom node types in a phrasing context, excluding links and link
 * references.
 *
 * @example
 * declare module 'mdast' {
 *   interface PhrasingContentMap {
 *     custom: Custom;
 *   }
 * }
 */
export interface PhrasingContentMap extends StaticPhrasingContentMap {
  link: Link
  linkReference: LinkReference
}

/**
 * This map registers all node types that are acceptable inside lists.
 *
 * This interface can be augmented to register custom node types that are acceptable inside lists.
 *
 * @example
 * declare module 'mdast' {
 *   interface ListContentMap {
 *     custom: Custom;
 *   }
 * }
 */
export interface ListContentMap {
  listItem: ListItem
}

/**
 * This map registers all node types that are acceptable inside tables (not table cells).
 *
 * This interface can be augmented to register custom node types that are acceptable inside tables.
 *
 * @example
 * declare module 'mdast' {
 *   interface TableContentMap {
 *     custom: Custom;
 *   }
 * }
 */
export interface TableContentMap {
  tableRow: TableRow
}

/**
 * This map registers all node types that are acceptable inside tables rows (not table cells).
 *
 * This interface can be augmented to register custom node types that are acceptable inside table rows.
 *
 * @example
 * declare module 'mdast' {
 *   interface RowContentMap {
 *     custom: Custom;
 *   }
 * }
 */
export interface RowContentMap {
  tableCell: TableCell
}

export type Content =
  | TopLevelContent
  | ListContent
  | TableContent
  | RowContent
  | PhrasingContent

export type TopLevelContent = BlockContent | DefinitionContent

export type BlockContent = BlockContentMap[keyof BlockContentMap]

export type DefinitionContent = DefinitionContentMap[keyof DefinitionContentMap]

export type ListContent = ListContentMap[keyof ListContentMap]

export type TableContent = TableContentMap[keyof TableContentMap]

export type RowContent = RowContentMap[keyof RowContentMap]

export type PhrasingContent = PhrasingContentMap[keyof PhrasingContentMap]

export type StaticPhrasingContent =
  StaticPhrasingContentMap[keyof StaticPhrasingContentMap]

export interface Parent extends UnistParent {
  children: Content[]
}

export interface Literal extends UnistLiteral {
  value: string
}

export interface Root extends Parent {
  type: 'root'
}

export interface Heading extends Parent {
  type: 'heading'
  depth: 1 | 2 | 3 | 4 | 5 | 6
  children: PhrasingContent[]
}

export interface ThematicBreak extends Node {
  type: 'thematicBreak'
}

export interface ListItem extends Parent {
  type: 'listItem'
  checked?: boolean | null | undefined
  spread?: boolean | null | undefined
  children: Array<BlockContent | DefinitionContent>
}

export interface Table extends Parent {
  type: 'table'
  children: TableContent[]
}

export interface TableRow extends Parent {
  type: 'tableRow'
  children: RowContent[]
}

export interface TableCell extends Parent {
  type: 'tableCell'
  children: PhrasingContent[]
}

export interface HTML extends Literal {
  type: 'html'
}

export interface Definition extends Node, Association, Resource {
  type: 'definition'
}

export interface FootnoteDefinition extends Parent, Association {
  type: 'footnoteDefinition'
  children: Array<BlockContent | DefinitionContent>
}

export interface Text extends Literal {
  type: 'text'
}

export interface Emphasis extends Parent {
  type: 'emphasis'
  children: PhrasingContent[]
}

export interface Strong extends Parent {
  type: 'strong'
  children: PhrasingContent[]
}

export interface Delete extends Parent {
  type: 'delete'
  children: PhrasingContent[]
}

export interface Break extends Node {
  type: 'break'
}

export interface Link extends Parent, Resource {
  type: 'link'
  children: StaticPhrasingContent[]
}

export interface LinkReference extends Parent, Reference {
  type: 'linkReference'
  children: StaticPhrasingContent[]
}

export interface Footnote extends Parent {
  type: 'footnote'
  children: PhrasingContent[]
}

export interface FootnoteReference extends Node, Association {
  type: 'footnoteReference'
}

// Mixin
export interface Resource {
  url: string
  title?: string | null | undefined
}

export interface Association {
  identifier: string
  label?: string | null | undefined
}

export interface Reference extends Association {
  referenceType: ReferenceType
}

export interface Alternative {
  alt?: string | null | undefined
}

// Extended nodes

export interface Paragraph extends Parent {
  type: 'paragraph'
  children: PhrasingContent[]
  indent?: number | null | undefined
}

export interface List extends Parent {
  type: 'list'
  ordered?: boolean | null | undefined
  definition?: boolean | null | undefined
  start?: number | null | undefined
  spread?: boolean | null | undefined
  children: ListContent[]
}

/**
 * @example
 * [[Image:My Image.png|10x20px|A caption]]
 *
 * [Read more]{@link https://en.wikipedia.org/wiki/Wikipedia:Extended_image_syntax}
 */
export interface Image extends Node, Resource, Alternative {
  type: 'image'
  prefix: 'File' | 'Image'
  name: string
  kind?:
    | 'thumb'
    | 'thumbnail'
    | `thumb=${string}`
    | `thumbnail=${string}`
    | 'frame'
    | 'framed'
    | 'frameless'
  border?: boolean
  location?: 'left' | 'right' | 'center' | 'none'
  aligntment?:
    | 'baseline'
    | 'sub'
    | 'super'
    | 'top'
    | 'text-top'
    | 'middle'
    | 'bottom'
    | 'text-bottom' // Defaults to "middle"
  size?:
    | 'upright'
    | `upright=${number}` // Defaults to factor of 0.75
    | `${number}px`
    | `x${number}px`
    | `${number}x${number}px`
  link?: Link
  alt?: string
  langtag?: IETFLangTag
  class?: string
  upright?: number
  caption?: PhrasingContent // The last argument
}

// Non-markdown nodes

/**
 * @example
 * [[File:My Image.png|10x20px|A caption]]
 */
export interface File extends Omit<Image, 'type'> {
  type: 'file'
  page?: number // Page other than one to use for thumbnail for multipage files
  thumbtime?: 'Time' // For videos to display the time in the thumbnail
  start?: number
  end?: number
}

type IETFLangTag = string

export interface Signature extends Node {
  type: 'signature'
  showName: boolean
  showTime: boolean
}

/**
 * @example
 * #REDIRECT [[United States]]
 *
 * [Read more]{@link https://en.wikipedia.org/wiki/Help:Wikitext#Redirect}
 */
export interface Redirect extends Node {
  type: 'redirect'
  value: Link
}

/**
 * - `__TOC__`: render TOC where this is mentioned
 * - `__NOTOC__`: disable TOC
 * - `__FORCETOC__`: force TOC to render at normal location
 *
 * [Read more]{@link https://en.wikipedia.org/wiki/Help:Wikitext#Table_of_contents}
 */
export interface TOC extends Node {
  type: 'toc'
  forced?: boolean | null | undefined
  disabled?: boolean | null | undefined
}

// Custom html tags

export interface Nowiki extends Node {}

/**
 * Displays the references list.
 *
 * @example
 * <references/>
 */
export interface References extends Node {
  type: 'references'
}

export interface Gallery extends Parent {
  type: 'gallery'
  children: Array<Image>
  attributes: {
    mode?:
      | 'traditional'
      | 'nolines'
      | 'packed'
      | 'packed-overlay'
      | 'packed-hover'
      | 'slideshow'
    caption?: string
    widths?: string // Comma-separated?
    heights?: string // Comma-separated?
    perrow?: number
    showfilename?: 'yes'
    class?: string
    style?: string
  }
}

export interface Math extends Literal {
  type: 'math'
}

export interface SyntaxHighlighting extends Literal {
  type: 'syntaxHighlighting'
}
