import { NextResponse } from 'next/server'

export async function GET() {
  // Mock API response - replace with your actual data source
  const statuses = ['single', 'in relationship', 'married', 'closed relationship', 'its complicated']
  const randomAge = Math.floor(Math.random() * 55)
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
  const names = ["ธนินท์ ศิลาดี", "สุรยุทธ์ สิงห์ขาว", "ณิชนันทน์ รักษาทรัพย์", "ธิศา จันวราสกุล", "กร สว่างเสนา", "กษิดิษฐ์ ก้องกิจ", "ชาติ บุญดี"];
  const randomNames = names[Math.floor(Math.random() * statuses.length)]

  return NextResponse.json({
    age: randomAge,
    status: randomStatus,
    name: randomNames
  })
}