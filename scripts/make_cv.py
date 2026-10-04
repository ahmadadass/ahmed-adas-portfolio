from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,HRFlowable,Table,TableStyle
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from pathlib import Path
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont('CVSans','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('CVSans-Bold','/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
pdfmetrics.registerFontFamily('CVSans',normal='CVSans',bold='CVSans-Bold')
out=Path(__file__).resolve().parents[1]/'public'/'Ahmed-Adas-CV.pdf'
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='NameAA',fontName='CVSans-Bold',fontSize=28,leading=32,textColor=HexColor('#162333'),spaceAfter=7))
styles.add(ParagraphStyle(name='RoleAA',fontName='CVSans',fontSize=13,leading=18,textColor=HexColor('#195ce5'),spaceAfter=12))
styles.add(ParagraphStyle(name='BodyAA',fontName='CVSans',fontSize=9.7,leading=14,textColor=HexColor('#354254'),spaceAfter=6))
styles.add(ParagraphStyle(name='SectionAA',fontName='CVSans-Bold',fontSize=10,leading=15,textColor=HexColor('#195ce5'),spaceBefore=13,spaceAfter=7))
styles.add(ParagraphStyle(name='TitleAA',fontName='CVSans-Bold',fontSize=10.5,leading=15,textColor=HexColor('#162333'),spaceAfter=5))
story=[]
def add(t,s='BodyAA'):story.append(Paragraph(t,styles[s]))
add('Ahmed Adas','NameAA');add('Android &amp; Mobile App Developer','RoleAA')
add('Palestine | <link href="mailto:adass0301@gmail.com">adass0301@gmail.com</link> | +972 593 407 569<br/><link href="https://github.com/ahmadadass">github.com/ahmadadass</link> | <link href="https://t.me/ahmadA0301">t.me/ahmadA0301</link>')
story.append(Spacer(1,7));story.append(HRFlowable(width='100%',thickness=1,color=HexColor('#dce2ea')))
add('PROFILE','SectionAA');add('Mobile development student with four years of hands-on Android practice using Java and Kotlin. Independently builds apps with local databases, authentication, APIs and offline functionality. Adaptable, patient and self-directed. Open to junior roles, internships and freelance opportunities.')
add('TECHNICAL SKILLS','SectionAA');add('<b>Core:</b> Java, Kotlin, Android, SQLite, SQL, JavaScript, Node.js, REST APIs, Git/GitHub.<br/><b>Additional experience:</b> C++, Python, HTML/CSS, Firebase, Linux, algorithms and data structures.<br/><b>Currently developing:</b> Dart and Flutter.')
add('SELECTED PROJECTS','SectionAA');add('Sooqy | Android accounting &amp; inventory app','TitleAA');add('Built a mobile tool for small shops and market stalls in Gaza to track stock, customer balances, expiry dates and transaction history. Developed the Java/Kotlin app, SQLite storage and JavaScript/Node.js API for authentication and cloud synchronization. Completed, with limited use beyond personal testing; not yet published on an app store.')
add('LAN Messenger | Direct local-network communication','TitleAA');add('Built Java clients for Android and Windows to exchange messages and files without internet access or a dedicated server. Used UDP for text messages, TCP for file transfer and SQLite for local data. Developed in response to local communication needs during displacement in Gaza in 2025.')
add('Other completed projects','TitleAA');add('Bot Dashboard: web dashboard for a Telegram bot. FreelanceJobHub: independently built university project. Gaza Aid Data: a project for local community work.')
add('EDUCATION','SectionAA');add('BSc, Smartphone Application Design &amp; Programming','TitleAA');add('University College of Applied Sciences (UCAS)<br/>2023 - expected 2028 | Third-year student | GPA: 87.5/100')
add('ADDITIONAL BACKGROUND','SectionAA');add('Practical experience repairing phone and laptop circuit boards. Completed English level 8 and electronic circuit-board repair training. Participated in a UCAS hackathon.')
SimpleDocTemplate(str(out),pagesize=(595.27,841.89),rightMargin=44,leftMargin=44,topMargin=35,bottomMargin=35,title='Ahmed Adas - CV',author='Ahmed Adas').build(story)
print(out)
