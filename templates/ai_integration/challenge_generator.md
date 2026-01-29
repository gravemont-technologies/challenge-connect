# AI Challenge Generation Template

## Goal
Automate the generation of corporate subtasks based on real-world business operations.

## Input Parameters
- `business_type`: (e.g., Logistics, Retail, Tech)
- `operation_type`: (e.g., Route Planning, Customer Feedback, Compliance)
- `student_college`: (e.g., Engineering, Business, Arts)
- `target_skills`: (List of required skills)

## AI Prompt Template
"As a Tahqeeq operational expert, generate a 2-week student challenge for a {business_type} company. The challenge should focus on {operation_type}. 
The student is from the {student_college} and has skills in {target_skills}. 
Format the output as a JSON object with: title, company, category, duration, reward, skills[], and a clear 2-sentence description."

## Advanced Rule-Based Scoring
- If `student_skills` matches > 70% of `target_skills` -> FitScore +20%
- If `student_college` aligns with `category` -> FitScore +15%
- If `complexity` matches `student_experience` -> FitScore +10%
