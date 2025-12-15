import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, phone } = body

    // Form doğrulaması
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'İsim ve telefon numarası gereklidir' },
        { status: 400 }
      )
    }

    // Payload sunucusunun whatsapp-requests endpoint'ine ilet
    const payloadUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'

    const response = await fetch(`${payloadUrl}/api/whatsapp-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email: email || undefined,
        phone,
        status: 'pending',
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Payload API hatası:', errorData)
      return NextResponse.json(
        { error: errorData.error || 'Talep kaydedilemedi' },
        { status: response.status }
      )
    }

    const result = await response.json()

    return NextResponse.json(
      { success: true, message: 'Talebiniz başarıyla alındı', data: result },
      { status: 200 }
    )
  } catch (error) {
    console.error('API hatası:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu', details: String(error) },
      { status: 500 }
    )
  }
}
