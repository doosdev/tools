// 도구 카테고리 데이터
export const toolCategories = [
  {
    id: 'data-processing',
    name: '데이터 처리',
    icon: 'bx-data',
    tools: [
      {
        name: 'JSON Formatter',
        desc: 'JSON 데이터를 정렬/검증',
        icon: 'bx-code-block',
        route: '/json-formatter',
      },
      {
        name: 'Base64 Encoder/Decoder',
        desc: 'Base64 인코딩/디코딩',
        icon: 'bx-lock-alt',
        route: '/base64',
      },
      {
        name: 'URL Encoder/Decoder',
        desc: 'URL 인코딩/디코딩',
        icon: 'bx-link',
        route: '/url-encoder',
      },
    ]
  },
  {
    id: 'text-tools',
    name: '텍스트 도구',
    icon: 'bx-text',
    tools: [
      {
        name: 'Regex Tester',
        desc: '정규표현식 테스트 및 디버깅',
        icon: 'bx-merge',
        route: '/regex-tester',
      },
      {
        name: 'Diff Checker',
        desc: '두 텍스트/코드의 차이 비교',
        icon: 'bx-candles',
        route: '/diff-checker',
      },
    ]
  },
  {
    id: 'converters',
    name: '포맷 변환',
    icon: 'bx-transfer',
    tools: [
      {
        name: 'Online Converters',
        desc: 'XML, CSV 등 다양한 포맷 변환',
        icon: 'bx-transfer',
        route: '/converters',
      },
    ]
  },
  {
    id: 'productivity',
    name: '생산성 도구',
    icon: 'bx-briefcase',
    tools: [
      {
        name: 'Clipboard Manager',
        desc: '복사/붙여넣기 기록 관리',
        icon: 'bx-clipboard',
        route: '/clipboard',
      },
    ]
  },
  {
    id: 'artificial-intelligence',
    name: 'AI Chat',
    icon: 'bx-brain',
    tools: [
      {
        name: 'ChatGPT',
        desc: 'ChatGPT 챗봇',
        icon: 'bx-brain',
        route: 'https://chatgpt.com',
      },
      {
        name: 'Claude',
        desc: 'Claude 챗봇',
        icon: 'bx-brain',
        route: 'https://claude.ai',
      },
      {
        name: 'Gemini',
        desc: 'Gemini 챗봇',
        icon: 'bx-brain',
        route: 'https://gemini.google.com',
      },
      {
        name: 'Grok',
        desc: 'Grok 챗봇',
        icon: 'bx-brain',
        route: 'https://grok.com',
      },
      {
        name: 'Poe',
        desc: 'Poe 챗봇',
        icon: 'bx-brain',
        route: 'https://poe.com',
      },
    ]
  },
  {
    id: 'AI-IDE',
    name: 'AI IDE',
    icon: 'bx-code',
    tools: [
      {
        name: 'Cursor',
        desc: '$0 / $20 / $200',
        icon: 'bx-code',
        route: 'https://cursor.com',
      },
      {
        name: 'Trae',
        desc: '$0 / $10',
        icon: 'bx-code',
        route: 'https://trae.ai',
      },
      {
        name: 'Claude Code',
        desc: '$0 / $17 / $100^',
        icon: 'bx-code',
        route: 'https://www.anthropic.com/pricing',
      },
      {
        name: 'Warp',
        desc: '$15 / $40 / $55 / $200',
        icon: 'bx-code',
        route: 'https://www.warp.dev',
      },
      {
        name: 'Windsurf',
        desc: '$0 / $15 / $30 / $60',

        icon: 'bx-code',
        route: 'https://windsurf.com',
      },
      {
        name: 'Kiro',
        desc: '$0 / $20 / $40 / $200',
        icon: 'bx-code',
        route: 'https://kiro.dev',
      }, 

    ]

  }
]

// 카테고리 ID로 카테고리 찾기
export const findCategoryById = (categoryId) => {
  return toolCategories.find(category => category.id === categoryId)
}

// 라우트로 카테고리 찾기
export const findCategoryByRoute = (route) => {
  return toolCategories.find(category => 
    category.tools.some(tool => tool.route === route)
  )
}

// 모든 도구 목록 가져오기
export const getAllTools = () => {
  return toolCategories.flatMap(category => 
    category.tools.map(tool => ({
      ...tool,
      categoryId: category.id,
      categoryName: category.name
    }))
  )
} 