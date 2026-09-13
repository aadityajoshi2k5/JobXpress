import React, { useState, useEffect } from 'react'
import '../styles/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useParams } from 'react-router'

const NAV_ITEMS = [
  { id: 'technical', label: 'Technical Questions' },
  { id: 'behavioral', label: 'Behavioral Questions' },
  { id: 'roadmap', label: 'Road Map' },
]

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='q-card'>
      <div className='q-card__header' onClick={() => setOpen(!open)}>
        <span className='q-card__index'>Q{index + 1}</span>
        <p className='q-card__question'>{item.question}</p>
      </div>

      {open && (
        <div className='q-card__body'>
          <div className='q-card__section'>
            <span>Intention</span>
            <p>{item.intention}</p>
          </div>

          <div className='q-card__section'>
            <span>Model Answer</span>
            <p>{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

const RoadMapDay = ({ day }) => (
  <div className='roadmap-day'>
    <div className='roadmap-day__header'>
      <span>Day {day.day}</span>
      <h3>{day.focus}</h3>
    </div>

    <ul>
      {day.tasks?.map((task, i) => (
        <li key={i}>{task}</li>
      ))}
    </ul>
  </div>
)

const Interview = () => {
  const [activeNav, setActiveNav] = useState('technical')
  const { report, getReportById, loading, getResumePdf } = useInterview()
  const { interviewId } = useParams()

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId)
    }
  }, [interviewId])

  if (loading || !report) {
    return (
      <main className='loading-screen'>
        <h1>Loading your interview plan...</h1>
      </main>
    )
  }

  // Singular API property names, with empty-array fallbacks
  const technicalQuestion = report.technicalQuestion ?? []
  const behavioralQuestion = report.behavioralQuestion ?? []
  const skillGap = report.skillGap ?? []
  const preparationPlan = report.preparationPlan ?? []

  const scoreColor =
    report.matchScore >= 80
      ? 'score--high'
      : report.matchScore >= 60
        ? 'score--mid'
        : 'score--low'

  return (
    <div className='interview-page'>
      <div className='interview-layout'>
        <nav className='interview-nav'>
          <div className='nav-content'>
            <p className='interview-nav__label'>Sections</p>

            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''
                  }`}
                onClick={() => setActiveNav(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => getResumePdf(interviewId)}
            className='button primary-button'
          >
            Download Resume
          </button>
        </nav>

        <div className='interview-divider' />

        <main className='interview-content'>
          {activeNav === 'technical' && (
            <section>
              <div className='content-header'>
                <h2>Technical Questions</h2>
                <span className='content-header__count'>
                  {technicalQuestion.length} questions
                </span>
              </div>

              <div className='q-list'>
                {technicalQuestion.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === 'behavioral' && (
            <section>
              <div className='content-header'>
                <h2>Behavioral Questions</h2>
                <span className='content-header__count'>
                  {behavioralQuestion.length} questions
                </span>
              </div>

              <div className='q-list'>
                {behavioralQuestion.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === 'roadmap' && (
            <section>
              <div className='content-header'>
                <h2>Preparation Road Map</h2>
                <span className='content-header__count'>
                  {preparationPlan.length}-day plan
                </span>
              </div>

              <div className='roadmap-list'>
                {preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            </section>
          )}
        </main>

        <div className='interview-divider' />

        <aside className='interview-sidebar'>
          <div className='match-score'>
            <p className='match-score__label'>Match Score</p>

            <div className={`match-score__ring ${scoreColor}`}>
              <span className='match-score__value'>{report.matchScore ?? 0}</span>
              <span className='match-score__pct'>%</span>
            </div>

            <p className='match-score__sub'>Strong match for this role</p>
          </div>

          <div className='sidebar-divider' />

          <div className='skill-gaps'>
            <p className='skill-gaps__label'>Skill Gaps</p>

            <div className='skill-gaps__list'>
              {skillGap.map((gap, i) => (
                <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Interview