# AI Fit Score Logic Template

## Scoring Components
1. **Hard Skill Match (40%)**
   - Direct match: 1.0
   - Related skill (via embedding distance): 0.5-0.8
   - No match: 0

2. **Soft Skill Match (20%)**
   - Team style vs Challenge requirement

3. **Domain Alignment (30%)**
   - Major/College vs Industry sector

4. **Diversity Multiplier (10%)**
   - Boost scores for under-represented skill-industry pairings to ensure variety.

## Migration Path
- Currently using static weights in rule-based engine.
- Future: Use Vector DB (Pinecone/Milvus) to calculate semantic similarity between Student Profiles and Challenge Descriptions.
