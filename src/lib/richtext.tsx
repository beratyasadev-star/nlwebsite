import React from 'react'

export function serializeRichText(content: any): string {
  if (!content || !Array.isArray(content)) return ''
  
  const serializeNode = (node: any): string => {
    const serializeChildren = (children: any[]): string => {
      if (!children) return ''
      return children.map((child: any) => {
        if (child.text !== undefined) {
          let t = child.text || ''
          if (child.bold) t = `<strong>${t}</strong>`
          if (child.italic) t = `<em>${t}</em>`
          if (child.underline) t = `<u>${t}</u>`
          if (child.code) t = `<code class="bg-gray-100 px-1 rounded">${t}</code>`
          return t
        }
        // Nested node (like link)
        if (child.type === 'link') {
          const linkText = serializeChildren(child.children)
          return `<a href="${child.url}" class="text-sky-600 hover:underline" target="_blank" rel="noopener noreferrer">${linkText}</a>`
        }
        return serializeNode(child)
      }).join('')
    }

    if (node.type === 'h1') {
      return `<h1 class="text-3xl font-bold text-gray-900 mt-8 mb-4">${serializeChildren(node.children)}</h1>`
    }
    if (node.type === 'h2') {
      return `<h2 class="text-2xl font-bold text-gray-900 mt-6 mb-3">${serializeChildren(node.children)}</h2>`
    }
    if (node.type === 'h3') {
      return `<h3 class="text-xl font-bold text-gray-900 mt-4 mb-2">${serializeChildren(node.children)}</h3>`
    }
    if (node.type === 'ul') {
      const items = node.children?.map((li: any) => 
        `<li class="ml-4">${serializeChildren(li.children)}</li>`
      ).join('') || ''
      return `<ul class="list-disc list-inside my-4 space-y-2 text-gray-700">${items}</ul>`
    }
    if (node.type === 'ol') {
      const items = node.children?.map((li: any) => 
        `<li class="ml-4">${serializeChildren(li.children)}</li>`
      ).join('') || ''
      return `<ol class="list-decimal list-inside my-4 space-y-2 text-gray-700">${items}</ol>`
    }
    if (node.type === 'quote') {
      return `<blockquote class="border-l-4 border-sky-500 pl-4 italic my-4 text-gray-700">${serializeChildren(node.children)}</blockquote>`
    }
    
    return `<p class="text-gray-700 leading-relaxed mb-4">${serializeChildren(node.children)}</p>`
  }
  
  return content.map(serializeNode).join('')
}

export function renderRichText(content: any) {
  if (!content) return null
  
  try {
    const parsed = typeof content === 'string' ? JSON.parse(content) : content
    
    const renderChildren = (children: any[]) => {
      if (!children) return null
      return children.map((child: any, idx: number) => {
        if (child.text !== undefined) {
          let text = child.text
          if (child.bold) {
            return <strong key={idx}>{text}</strong>
          }
          if (child.italic) {
            return <em key={idx}>{text}</em>
          }
          if (child.underline) {
            return <u key={idx}>{text}</u>
          }
          if (child.code) {
            return <code key={idx} className="bg-gray-100 px-1 rounded text-sm">{text}</code>
          }
          return <React.Fragment key={idx}>{text}</React.Fragment>
        }
        // Nested elements like links
        if (child.type === 'link') {
          return (
            <a 
              key={idx}
              href={child.url} 
              className="text-sky-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {renderChildren(child.children)}
            </a>
          )
        }
        return null
      })
    }
    
    return parsed.map((node: any, index: number) => {
      if (node.type === 'h1') {
        return <h1 key={index} className="text-4xl font-bold mb-4">{renderChildren(node.children)}</h1>
      }
      if (node.type === 'h2') {
        return <h2 key={index} className="text-3xl font-bold mb-3 mt-8">{renderChildren(node.children)}</h2>
      }
      if (node.type === 'h3') {
        return <h3 key={index} className="text-2xl font-bold mb-2 mt-6">{renderChildren(node.children)}</h3>
      }
      if (node.type === 'ul') {
        return (
          <ul key={index} className="list-disc list-inside mb-4 text-lg text-gray-700 space-y-2">
            {node.children?.map((li: any, liIndex: number) => (
              <li key={liIndex} className="ml-4">{renderChildren(li.children)}</li>
            ))}
          </ul>
        )
      }
      if (node.type === 'ol') {
        return (
          <ol key={index} className="list-decimal list-inside mb-4 text-lg text-gray-700 space-y-2">
            {node.children?.map((li: any, liIndex: number) => (
              <li key={liIndex} className="ml-4">{renderChildren(li.children)}</li>
            ))}
          </ol>
        )
      }
      if (node.type === 'quote') {
        return (
          <blockquote key={index} className="border-l-4 border-sky-500 pl-4 italic my-4 text-lg text-gray-700">
            {renderChildren(node.children)}
          </blockquote>
        )
      }
      return <p key={index} className="text-lg text-gray-700 mb-4 leading-relaxed">{renderChildren(node.children)}</p>
    })
  } catch (e) {
    return <p className="text-lg text-gray-700 mb-4 leading-relaxed">{String(content)}</p>
  }
}
