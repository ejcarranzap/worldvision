
IF OBJECT_ID('fn_seq_tbl_ad_manager') IS NOT NULL DROP FUNCTION fn_seq_tbl_ad_manager
IF OBJECT_ID('sp_tbl_ad_manager') IS NOT NULL DROP PROCEDURE sp_tbl_ad_manager
GO
CREATE FUNCTION fn_seq_tbl_ad_manager()
  RETURNS INT
AS
BEGIN
  DECLARE @ID INT = 0
  SELECT @ID = ISNULL(MAX(Id_manager),0)+1 FROM tbl_ad_manager
  RETURN @ID
END
GO
CREATE PROCEDURE sp_tbl_ad_manager
  @ACTION NVARCHAR(40) = NULL,
  @RAWPRM NVARCHAR(255) = NULL,
  @Id_manager INT = NULL,
  @code NVARCHAR(20) = NULL,
  @name NVARCHAR(50) = NULL,
  @mobile NVARCHAR(50) = NULL,
  @email NVARCHAR(50) = NULL,
  @date_mod DATETIME = NULL,
  @user_mod NVARCHAR(20) = NULL,
  @active INT = NULL
AS
SET NOCOUNT ON
  DECLARE @MSG NVARCHAR(MAX) = ''
  
  IF ISNULL(@ACTION,'') = 'S'
  BEGIN
    SELECT
    A.Id_manager,
    A.code,
    A.name,
    A.mobile,
    A.email,
    A.date_mod,
    A.user_mod,
    A.active
    FROM tbl_ad_manager A WHERE 1 = 1
    AND (COALESCE(@Id_manager,A.Id_manager) = A.Id_manager OR @Id_manager IS NULL)
    AND (COALESCE(@code,A.code) = A.code OR @code IS NULL)
    AND (COALESCE(@name,A.name) = A.name OR @name IS NULL)
    AND (COALESCE(@mobile,A.mobile) = A.mobile OR @mobile IS NULL)
    AND (COALESCE(@email,A.email) = A.email OR @email IS NULL)
    AND (COALESCE(@date_mod,A.date_mod) = A.date_mod OR @date_mod IS NULL)
    AND (COALESCE(@user_mod,A.user_mod) = A.user_mod OR @user_mod IS NULL)
    AND (COALESCE(@active,A.active) = A.active OR @active IS NULL)
  END
  IF ISNULL(@ACTION,'') = 'I'
  BEGIN 
    BEGIN TRY
    BEGIN TRAN
      SET IDENTITY_INSERT tbl_ad_manager ON
      
      SET @Id_manager = dbo.fn_seq_tbl_ad_manager()
      INSERT INTO tbl_ad_manager(
      Id_manager,
      code,
      name,
      mobile,
      email,
      date_mod,
      user_mod,
      active
      )
      VALUES(
      @Id_manager,
      @code,
      @name,
      @mobile,
      @email,
      @date_mod,
      @user_mod,
      @active
      )
      
      DECLARE @IDENTITY INT = @@IDENTITY
      SELECT A.* FROM tbl_ad_manager A 
      WHERE A.Id_manager = @IDENTITY 
      SET IDENTITY_INSERT tbl_ad_manager OFF
    COMMIT
    END TRY
    BEGIN CATCH
      ROLLBACK
      SET @MSG = ERROR_MESSAGE() + ' ERRLINE > ' + ERROR_LINE() + 'ERRNUMBER > ' + ERROR_NUMBER()
      RAISERROR(@MSG,18,0)
    END CATCH
  END
  
  IF ISNULL(@ACTION,'') = 'U'
  BEGIN
    UPDATE A SET
    A.code = @code,
    A.name = @name,
    A.mobile = @mobile,
    A.email = @email,
    A.date_mod = @date_mod,
    A.user_mod = @user_mod,
    A.active = @active
    FROM tbl_ad_manager A
    WHERE A.Id_manager = @Id_manager
    
    SELECT A.* FROM tbl_ad_manager A 
    WHERE A.Id_manager = @Id_manager
  END
  
  IF ISNULL(@ACTION,'') = 'D'
  BEGIN
    DELETE
    FROM tbl_ad_manager
    WHERE Id_manager = @Id_manager
    
    SELECT @Id_manager Id_manager
  END
  
SET NOCOUNT OFF
